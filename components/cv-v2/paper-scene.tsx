"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { DirectionalLight, Group } from "three";
import { PAPER_HEIGHT, PAPER_WIDTH, PaperPage } from "./paper-page";

const PAGE_GAP = 72;
const CAMERA_Z = 1500;
const CAMERA_FOV = 40;
// The sheet should read close-up on every viewport, so the camera fits the
// page width to the canvas rather than sitting at a fixed distance — a
// fixed Z clips the sides on narrow, portrait screens.
const WIDTH_FILL = 0.86;
const MIN_CAMERA_Z = 900;
const MAX_CAMERA_Z = 2600;
const SHEET_STAGGER = 0.22;
const FIRST_DROP_DELAY = 0.12;
const SCROLL_EASE = 10;
const SCROLL_LINE = 120;
const SCROLL_PAGE = 900;
const TABLE_SIZE = 9000;
const SHADOW_FRUSTUM = 1600;
const TEXTURES = ["/cv-v2/page-1.png", "/cv-v2/page-2.png"];

type SceneProps = {
  reduceMotion: boolean;
  replayToken: number;
  scrollTarget: React.RefObject<number>;
};

function Papers({ reduceMotion, replayToken, scrollTarget }: SceneProps) {
  const groupRef = useRef<Group>(null);
  const scroll = useRef(0);

  useFrame((_state, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }
    scroll.current +=
      (scrollTarget.current - scroll.current) *
      Math.min(1, delta * SCROLL_EASE);
    group.position.y = scroll.current;
  });

  return (
    <group ref={groupRef}>
      {TEXTURES.map((textureUrl, index) => (
        <PaperPage
          centerY={-index * (PAPER_HEIGHT + PAGE_GAP)}
          dropDelay={FIRST_DROP_DELAY + index * SHEET_STAGGER}
          index={index}
          key={textureUrl}
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
    const aspect = width / height;
    const fovRad = (CAMERA_FOV * Math.PI) / 180;
    const targetWidth = PAPER_WIDTH / WIDTH_FILL;
    const z = targetWidth / (2 * Math.tan(fovRad / 2) * aspect);
    camera.position.z = Math.min(MAX_CAMERA_Z, Math.max(MIN_CAMERA_Z, z));
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
// frame loop eases toward.
function useScrollControls(maxScroll: number) {
  const scrollTarget = useRef(0);

  useEffect(() => {
    const clamp = (value: number) => Math.min(maxScroll, Math.max(0, value));
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
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [maxScroll]);

  return scrollTarget;
}

export default function PaperScene() {
  const [replayToken, setReplayToken] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const scrollTarget = useScrollControls(PAPER_HEIGHT + PAGE_GAP);

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
        dpr={[1, 2]}
        flat
        shadows="soft"
      >
        <color args={["#efeeeb"]} attach="background" />
        <CameraFit />
        <Daylight />
        <Table />
        <Suspense fallback={null}>
          <Papers
            reduceMotion={reduceMotion}
            replayToken={replayToken}
            scrollTarget={scrollTarget}
          />
        </Suspense>
      </Canvas>
      <p className="cv-v2-hint">
        scroll for page 2 · press R to drop the pages again ·{" "}
        <a href="/cv">flat version</a>
      </p>
    </div>
  );
}
