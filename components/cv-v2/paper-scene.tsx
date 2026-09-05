"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { DirectionalLight, Group, Mesh } from "three";
import { CAMERA_FOV, fitCameraZ, visibleHeightAt } from "./camera-fit";
import { CV_LINK_RECTS } from "./cv-links.generated";
import { LinkOverlay } from "./link-overlay";
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
const SHADOW_FRUSTUM = 1600;
const TEXTURES = ["/cv-v2/page-1.png", "/cv-v2/page-2.png"];

type SceneProps = {
  meshesRef: React.RefObject<(Mesh | null)[]>;
  reduceMotion: boolean;
  replayToken: number;
  scrollTarget: React.RefObject<number>;
};

function Papers({
  meshesRef,
  reduceMotion,
  replayToken,
  scrollTarget,
}: SceneProps) {
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
      {TEXTURES.map((textureUrl, index) => (
        <PaperPage
          centerY={-index * (PAPER_HEIGHT + PAGE_GAP)}
          dropDelay={FIRST_DROP_DELAY + index * SHEET_STAGGER}
          index={index}
          key={textureUrl}
          onMeshRef={(mesh) => {
            meshesRef.current[index] = mesh;
          }}
          reduceMotion={reduceMotion}
          replayToken={replayToken}
          textureUrl={textureUrl}
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
    light.shadow.radius = 8;
    light.shadow.bias = -0.0002;
  }, []);

  return (
    <>
      {/* Open-sky fill, slightly cool. Lambert shading divides by π, so
          intensities here are ~π× the target contribution. */}
      <ambientLight color="#f2f4fa" intensity={2.2} />
      {/* Warm window light from the upper left, casting the soft shadows. */}
      <directionalLight
        castShadow
        color="#fff6e6"
        intensity={1.4}
        position={[-850, 950, 1500]}
        ref={lightRef}
        shadow-mapSize={[1024, 1024]}
      />
    </>
  );
}

function Table() {
  return (
    <mesh position={[0, -TABLE_SIZE / 4, 0]} receiveShadow>
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

export default function PaperScene() {
  const [replayToken, setReplayToken] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const meshesRef = useRef<(Mesh | null)[]>([]);
  const anchorRefs = useRef<(HTMLAnchorElement | null)[][]>(
    CV_LINK_RECTS.map(() => [])
  );
  const scrollTarget = useScrollControls();

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
    <div className="cv-v2-3d">
      <Canvas
        camera={{
          far: 8000,
          fov: CAMERA_FOV,
          near: 10,
          position: [0, 0, CAMERA_Z],
        }}
        // Browser zoom raises devicePixelRatio; capping at 2 clamped the
        // canvas below that and blurred it on top of the texture's own
        // ceiling. 3 covers zoomed retina displays without over-rendering
        // at 1x.
        dpr={[1, 3]}
        flat
        shadows="soft"
      >
        <color args={["#efeeeb"]} attach="background" />
        <CameraFit />
        <Daylight />
        <Table />
        <Suspense fallback={null}>
          <Papers
            meshesRef={meshesRef}
            reduceMotion={reduceMotion}
            replayToken={replayToken}
            scrollTarget={scrollTarget}
          />
          <LinkOverlay
            anchorRefs={anchorRefs}
            meshRefs={meshesRef}
            pages={CV_LINK_RECTS}
          />
        </Suspense>
      </Canvas>
      <div className="cv-v2-links">
        {CV_LINK_RECTS.map((rects, pageIndex) => (
          <div key={pageIndex}>
            {rects.map((rect, linkIndex) => (
              <a
                className="cv-v2-link"
                href={rect.href}
                key={rect.href}
                ref={(el) => {
                  anchorRefs.current[pageIndex][linkIndex] = el;
                }}
              >
                {/* Invisible over the texture; gives the overlay real,
                    screen-reader-accessible content instead of an empty
                    <a>. */}
                <span className="sr-only">{rect.label}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
