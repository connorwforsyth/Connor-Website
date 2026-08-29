"use client";

import { type ThreeEvent, useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  DoubleSide,
  type Mesh,
  type MeshStandardMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  TextureLoader,
  Vector2,
} from "three";
import { criticallyDampedAt } from "./spring";

// World units are CSS pixels: an A4 sheet at 96dpi.
export const PAPER_WIDTH = 794;
export const PAPER_HEIGHT = 1123;
const SEGMENTS_X = 28;
const SEGMENTS_Y = 40;

// Drop springs — same feel as the DOM version, now bending a real mesh.
const DROP_HEIGHT = 380;
const DROP_OMEGA = 2.0;
const DRIFT = 30;
const DRIFT_OMEGA = 1.7;
const REST_HOVER = 4; // resting height keeps the sheet off the table plane
const TILT_PER_SPEED = 0.000_55; // rad of rotateX per px/s of descent
const TWIST_PER_SPEED = 0.0009; // rad of rotateZ per px/s of drift
const REST_TWISTS_RAD = [0.006, -0.005];
const FADE_IN = 0.5;

// Cloth response. Bend and flutter are driven by descent speed, so the
// sheet bows and ripples while it moves and relaxes flat as it slows.
const CURL_PER_SPEED = 0.075; // px of edge curl per px/s of descent
const MAX_CURL = 46;
const FLUTTER_PER_SPEED = 0.02;
const MAX_FLUTTER = 11;
const FLUTTER_WAVELENGTHS = 1.6;
const FLUTTER_HZ = 2.6;
const BREATH_AMPLITUDE = 1.6; // idle micro-motion so the paper stays alive
const BREATH_HZ = 0.24;
const POINTER_RADIUS = 130;
const POINTER_HOVER_DEPTH = 10;
const POINTER_PRESS_DEPTH = 26;
const POINTER_EASE = 10;
const FAR_AWAY = 1e6;

type PaperPageProps = {
  centerY: number;
  dropDelay: number;
  index: number;
  reduceMotion: boolean;
  replayToken: number;
  textureUrl: string;
};

export function PaperPage({
  centerY,
  dropDelay,
  index,
  reduceMotion,
  replayToken,
  textureUrl,
}: PaperPageProps) {
  const texture = useLoader(TextureLoader, textureUrl);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 8;

  const meshRef = useRef<Mesh>(null);
  const pointerLocal = useRef(new Vector2(FAR_AWAY, FAR_AWAY));
  const pointerDepth = useRef(0);
  const pressed = useRef(false);
  const hovered = useRef(false);
  const startedAt = useRef<number | undefined>(undefined);
  const lastReplayToken = useRef(replayToken);

  const geometry = useMemo(
    () => new PlaneGeometry(PAPER_WIDTH, PAPER_HEIGHT, SEGMENTS_X, SEGMENTS_Y),
    []
  );
  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry]
  );

  const direction = index % 2 === 0 ? 1 : -1;
  const restTwist = REST_TWISTS_RAD[index] ?? 0;

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh) {
      return;
    }

    const elapsed = state.clock.elapsedTime;
    if (
      startedAt.current === undefined ||
      lastReplayToken.current !== replayToken
    ) {
      startedAt.current = elapsed;
      lastReplayToken.current = replayToken;
    }
    const local = reduceMotion
      ? Number.MAX_SAFE_INTEGER
      : elapsed - startedAt.current - dropDelay;

    const height = criticallyDampedAt(DROP_HEIGHT, DROP_OMEGA, local);
    const drift = criticallyDampedAt(direction * DRIFT, DRIFT_OMEGA, local);
    const speed = -height.velocity; // px/s of descent, positive while falling

    mesh.position.set(drift.position, centerY, REST_HOVER + height.position);
    mesh.rotation.x = speed * TILT_PER_SPEED;
    mesh.rotation.z = restTwist + drift.velocity * TWIST_PER_SPEED;

    const material = mesh.material as MeshStandardMaterial;
    material.opacity = Math.min(1, Math.max(0, (local + FADE_IN) / FADE_IN));

    // Ease the pointer dimple toward its target depth.
    const dimpleTarget = hovered.current
      ? pressed.current
        ? POINTER_PRESS_DEPTH
        : POINTER_HOVER_DEPTH
      : 0;
    pointerDepth.current +=
      (dimpleTarget - pointerDepth.current) * Math.min(1, delta * POINTER_EASE);

    const curl = Math.min(MAX_CURL, speed * CURL_PER_SPEED);
    const flutter = reduceMotion
      ? 0
      : Math.min(MAX_FLUTTER, speed * FLUTTER_PER_SPEED);
    const breath = reduceMotion ? 0 : BREATH_AMPLITUDE;
    const phase = elapsed * Math.PI * 2;
    const pointer = pointerLocal.current;
    const sigma2 = 2 * POINTER_RADIUS * POINTER_RADIUS;

    const positions = geometry.attributes.position;
    const array = positions.array as Float32Array;
    for (let i = 0; i < positions.count; i += 1) {
      const x = basePositions[i * 3];
      const y = basePositions[i * 3 + 1];
      const u = x / (PAPER_WIDTH / 2);
      const v = y / (PAPER_HEIGHT / 2);

      // Falling: the middle leads and the edges lag upward.
      let z = curl * (u * u * 0.55 + v * v * 0.45);
      // A ripple travels down the sheet while it moves through the air.
      z +=
        flutter *
        Math.sin(v * Math.PI * FLUTTER_WAVELENGTHS - phase * FLUTTER_HZ) *
        (0.4 + 0.6 * u * u);
      // Resting micro-motion, like the faintest air current.
      z += breath * Math.sin(phase * BREATH_HZ + v * 2.4 + index * 1.7);
      // Pointer pressing softly into the sheet.
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      z -= pointerDepth.current * Math.exp(-(dx * dx + dy * dy) / sigma2);

      array[i * 3 + 2] = z;
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  const onPointerMove = (event: ThreeEvent<PointerEvent>) => {
    if (event.uv) {
      hovered.current = true;
      pointerLocal.current.set(
        (event.uv.x - 0.5) * PAPER_WIDTH,
        (event.uv.y - 0.5) * PAPER_HEIGHT
      );
    }
  };
  const onPointerLeave = () => {
    hovered.current = false;
    pressed.current = false;
    pointerLocal.current.set(FAR_AWAY, FAR_AWAY);
  };

  return (
    <mesh
      castShadow
      geometry={geometry}
      onPointerDown={() => {
        pressed.current = true;
      }}
      onPointerLeave={onPointerLeave}
      onPointerMove={onPointerMove}
      onPointerUp={() => {
        pressed.current = false;
      }}
      ref={meshRef}
    >
      <meshStandardMaterial
        map={texture}
        metalness={0}
        roughness={0.92}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}
