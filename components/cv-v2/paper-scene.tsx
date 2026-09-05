"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { DirectionalLight, Group } from "three";
import { CAMERA_FOV, fitCameraZ, visibleHeightAt } from "./camera-fit";
import { Css3dLayer } from "./css3d-layer";
import { PAPER_HEIGHT, PAPER_WIDTH, PaperPage } from "./paper-page";

const PAGE_GAP = 72;
const CAMERA_Z = 1500;
const TOTAL_DOC_HEIGHT = PAPER_HEIGHT * 2 + PAGE_GAP;
// Breathing room above page 1's top edge and below page 2's bottom edge —
// without it the page sits flush against the viewport frame, which reads
// as cramped now that the camera is zoomed in close.
const SCROLL_EDGE_GAP = 56;
const SHEET_STAGGER = 0.22;
const FIRST_DROP_DELAY = 0.12;
const SCROLL_EASE = 10;
const SCROLL_LINE = 120;
const SCROLL_PAGE = 900;
const TABLE_SIZE = 9000;
// The tabletop sits behind the plane the sheets rest on, not flush with
// it. That gap is what gives the daylight something to throw: at this
// depth the key light casts the page's shadow a few dozen pixels down and
// to the right, so it reads as a lit room rather than a sticker.
const TABLE_Z = -46;
// Wide enough to hold both sheets plus the scroll travel, tight enough
// that a 2048 map still resolves a clean penumbra at the paper's edge.
const SHADOW_FRUSTUM = 1800;
const SHADOW_RADIUS = 5;

type Sheet = { element: HTMLElement; id: string };

type PapersProps = {
  reduceMotion: boolean;
  replayToken: number;
  scrollTarget: React.RefObject<number>;
  sheets: Sheet[];
};

function Papers({
  reduceMotion,
  replayToken,
  scrollTarget,
  sheets,
}: PapersProps) {
  const groupRef = useRef<Group>(null);
  const scroll = useRef(0);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    scroll.current +=
      (scrollTarget.current - scroll.current) *
      Math.min(1, delta * SCROLL_EASE);
    // Anchor the top of page one to the top of the viewport at scroll 0 —
    // the camera sits closer than the page is tall, so centering (the old
    // approach) could strand the header above the visible frame with no
    // way to scroll up to it.
    const visibleHeight = visibleHeightAt(state.camera.position.z);
    const topOffset = (visibleHeight - PAPER_HEIGHT) / 2 - SCROLL_EDGE_GAP;
    group.position.y = topOffset + scroll.current;
  });

  return (
    <group ref={groupRef}>
      {sheets.map((sheet, index) => (
        <PaperPage
          centerY={-index * (PAPER_HEIGHT + PAGE_GAP)}
          dropDelay={FIRST_DROP_DELAY + index * SHEET_STAGGER}
          element={sheet.element}
          index={index}
          key={sheet.id}
          reduceMotion={reduceMotion}
          replayToken={replayToken}
        />
      ))}
    </group>
  );
}

function CameraFit() {
  const camera = useThree((state) => state.camera);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);

  useLayoutEffect(() => {
    camera.position.z = fitCameraZ(width, height, PAPER_WIDTH);
  }, [camera, width, height]);

  return null;
}

function Daylight() {
  const lightRef = useRef<DirectionalLight>(null);
  useEffect(() => {
    const light = lightRef.current;
    if (!light) {
      return;
    }
    light.shadow.camera.left = -SHADOW_FRUSTUM;
    light.shadow.camera.right = SHADOW_FRUSTUM;
    light.shadow.camera.top = SHADOW_FRUSTUM;
    light.shadow.camera.bottom = -SHADOW_FRUSTUM;
    light.shadow.camera.near = 100;
    light.shadow.camera.far = 6000;
    light.shadow.radius = SHADOW_RADIUS;
    light.shadow.bias = -0.0002;
    light.shadow.camera.updateProjectionMatrix();
  }, []);

  return (
    <>
      {/* Sky above, warm bounce off the table below. Lambert shading
          divides by π, so intensities here are ~π× the target. */}
      <hemisphereLight
        args={["#eef2fb", "#e8e2d6", 2.2]}
        position={[0, 1000, 0]}
      />
      {/* Warm window light from the upper left, casting the soft shadows. */}
      <directionalLight
        castShadow
        color="#fff6e6"
        intensity={1.4}
        position={[-850, 950, 1500]}
        ref={lightRef}
        shadow-mapSize={[2048, 2048]}
      />
    </>
  );
}

function Table() {
  return (
    <mesh position={[0, 0, TABLE_Z]} receiveShadow>
      <planeGeometry args={[TABLE_SIZE, TABLE_SIZE]} />
      <meshStandardMaterial color="#f2f1ee" metalness={0} roughness={1} />
    </mesh>
  );
}

// Wheel, touch-drag, and keyboard all steer one scroll target that the
// frame loop eases toward. The scroll range is however much of the
// document doesn't fit in the viewport at the current camera fit, so it's
// recomputed on resize alongside the camera.
function useScrollControls() {
  const scrollTarget = useRef(0);
  const maxScroll = useRef(0);

  useEffect(() => {
    const updateMaxScroll = () => {
      const z = fitCameraZ(window.innerWidth, window.innerHeight, PAPER_WIDTH);
      maxScroll.current = Math.max(
        0,
        TOTAL_DOC_HEIGHT - visibleHeightAt(z) + SCROLL_EDGE_GAP * 2
      );
      scrollTarget.current = Math.min(scrollTarget.current, maxScroll.current);
    };
    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);

    const clamp = (value: number) =>
      Math.min(maxScroll.current, Math.max(0, value));
    const onWheel = (event: WheelEvent) => {
      scrollTarget.current = clamp(scrollTarget.current + event.deltaY);
    };
    const keySteps: Record<string, number> = {
      " ": SCROLL_PAGE,
      ArrowDown: SCROLL_LINE,
      ArrowUp: -SCROLL_LINE,
      End: Number.POSITIVE_INFINITY,
      Home: Number.NEGATIVE_INFINITY,
      PageDown: SCROLL_PAGE,
      PageUp: -SCROLL_PAGE,
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const step = keySteps[event.key];
      if (step === undefined) {
        return;
      }
      event.preventDefault();
      scrollTarget.current = clamp(scrollTarget.current + step);
    };
    let lastTouchY: number | undefined;
    const onTouchStart = (event: TouchEvent) => {
      lastTouchY = event.touches[0]?.clientY;
    };
    const onTouchMove = (event: TouchEvent) => {
      const y = event.touches[0]?.clientY;
      if (y !== undefined && lastTouchY !== undefined) {
        scrollTarget.current = clamp(scrollTarget.current + (lastTouchY - y));
      }
      lastTouchY = y;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("resize", updateMaxScroll);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return scrollTarget;
}

export default function PaperScene({ pages }: { pages: React.ReactNode[] }) {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const [replayToken, setReplayToken] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const scrollTarget = useScrollControls();

  // One detached host element per page. React owns what's inside it (via a
  // portal, so the CV stays ordinary JSX with ordinary Tailwind); three's
  // CSS3DRenderer owns where it sits in the scene and reparents it into
  // its own layer. Because React never has to move these nodes itself,
  // that reparenting is safe.
  const sheets = useMemo<Sheet[]>(
    () =>
      pages.map((_, index) => {
        const element = document.createElement("div");
        element.className = "cv-v2-sheet";
        // Revealed by the drop; avoids a flash at the CSS3D layer's
        // untransformed origin before the first frame.
        element.style.opacity = "0";
        return { element, id: `cv-v2-sheet-${index}` };
      }),
    [pages]
  );

  useEffect(() => {
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "r" || event.key === "R") {
        setReplayToken((token) => token + 1);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="cv-v2-3d" ref={setRoot}>
      <Canvas
        camera={{
          far: 8000,
          fov: CAMERA_FOV,
          near: 10,
          position: [0, 0, CAMERA_Z],
        }}
        // The canvas now only draws the table and the sheets' shadows —
        // the pages themselves are DOM, and stay sharp on their own — so
        // there's no reason to render above 2x.
        dpr={[1, 2]}
        flat
        // PCF rather than three's deprecated PCFSoft, so the penumbra is
        // ours to set via shadow.radius.
        shadows="percentage"
      >
        <color args={["#efeeeb"]} attach="background" />
        <CameraFit />
        <Daylight />
        <Table />
        <Papers
          reduceMotion={reduceMotion}
          replayToken={replayToken}
          scrollTarget={scrollTarget}
          sheets={sheets}
        />
        <Css3dLayer container={root} />
      </Canvas>
      {sheets.map((sheet, index) =>
        createPortal(pages[index], sheet.element, sheet.id)
      )}
    </div>
  );
}
