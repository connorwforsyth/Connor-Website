"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  DoubleSide,
  type Mesh,
  type MeshStandardMaterial,
  PlaneGeometry,
  SRGBColorSpace,
  TextureLoader,
} from "three";
import { criticallyDampedAt } from "./spring";

// World units are CSS pixels: an A4 sheet at 96dpi.
export const PAPER_WIDTH = 794;
export const PAPER_HEIGHT = 1123;
const SEGMENTS_X = 16;
const SEGMENTS_Y = 22;

// Quick, quiet landing: a short drop that settles in about a second.
// The 3D-ness should register as texture, not as a performance. Each sheet
// gets a slightly different fall — a shared feel, not a repeated one.
const DROP_HEIGHT_BY_INDEX = [200, 235];
const DROP_OMEGA_BY_INDEX = [4.2, 3.7];
const DRIFT_BY_INDEX = [14, 20];
const DRIFT_OMEGA_BY_INDEX = [3.4, 3];
const REST_HOVER = 4; // resting height keeps the sheet off the table plane
const TILT_PER_SPEED = 0.000_24; // rad of rotateX per px/s of descent
const TWIST_PER_SPEED = 0.000_35; // rad of rotateZ per px/s of drift
const REST_TWISTS_RAD = [0.004, -0.003];
const FADE_IN = 0.25;

// Cloth response, kept just above the threshold of notice: the sheet bows
// slightly and ripples faintly while moving, then lies perfectly still.
const CURL_PER_SPEED = 0.055; // px of edge curl per px/s of descent
const MAX_CURL = 20;
const FLUTTER_PER_SPEED = 0.012;
const MAX_FLUTTER = 5;
const FLUTTER_WAVELENGTHS = 1.4;
const FLUTTER_HZ = 2.2;
const STILL_EPSILON = 0.02; // below this deformation the mesh goes idle

type PaperPageProps = {
  centerY: number;
  dropDelay: number;
  index: number;
  onMeshRef?: (mesh: Mesh | null) => void;
  reduceMotion: boolean;
  replayToken: number;
  textureUrl: string;
};

export function PaperPage({
  centerY,
  dropDelay,
  index,
  onMeshRef,
  reduceMotion,
  replayToken,
  textureUrl,
}: PaperPageProps) {
  const texture = useLoader(TextureLoader, textureUrl);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 16;

  const meshRef = useRef<Mesh>(null);
  const startedAt = useRef<number | undefined>(undefined);
  const lastReplayToken = useRef(replayToken);
  const deformed = useRef(false);

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
  const dropHeight = DROP_HEIGHT_BY_INDEX[index] ?? DROP_HEIGHT_BY_INDEX[0];
  const dropOmega = DROP_OMEGA_BY_INDEX[index] ?? DROP_OMEGA_BY_INDEX[0];
  const driftAmount = DRIFT_BY_INDEX[index] ?? DRIFT_BY_INDEX[0];
  const driftOmega = DRIFT_OMEGA_BY_INDEX[index] ?? DRIFT_OMEGA_BY_INDEX[0];

  useFrame((state) => {
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

    const height = criticallyDampedAt(dropHeight, dropOmega, local);
    const drift = criticallyDampedAt(
      direction * driftAmount,
      driftOmega,
      local
    );
    const speed = -height.velocity; // px/s of descent, positive while falling

    mesh.position.set(drift.position, centerY, REST_HOVER + height.position);
    mesh.rotation.x = speed * TILT_PER_SPEED;
    mesh.rotation.z = restTwist + drift.velocity * TWIST_PER_SPEED;

    const material = mesh.material as MeshStandardMaterial;
    material.opacity = Math.min(1, Math.max(0, (local + FADE_IN) / FADE_IN));

    const curl = Math.min(MAX_CURL, speed * CURL_PER_SPEED);
    const flutter = reduceMotion
      ? 0
      : Math.min(MAX_FLUTTER, speed * FLUTTER_PER_SPEED);

    // Once the sheet has settled, restore the flat geometry a single time
    // and stop touching vertices — the scene idles at zero geometry cost.
    if (curl + flutter < STILL_EPSILON) {
      if (deformed.current) {
        geometry.attributes.position.array.set(basePositions);
        geometry.attributes.position.needsUpdate = true;
        geometry.computeVertexNormals();
        deformed.current = false;
      }
      return;
    }
    deformed.current = true;

    const phase = elapsed * Math.PI * 2;
    const positions = geometry.attributes.position;
    const array = positions.array as Float32Array;
    for (let i = 0; i < positions.count; i += 1) {
      const x = basePositions[i * 3];
      const y = basePositions[i * 3 + 1];
      const u = x / (PAPER_WIDTH / 2);
      const v = y / (PAPER_HEIGHT / 2);

      // Falling: the middle leads and the edges lag upward.
      let z = curl * (u * u * 0.55 + v * v * 0.45);
      // A faint ripple travels down the sheet while it moves.
      z +=
        flutter *
        Math.sin(v * Math.PI * FLUTTER_WAVELENGTHS - phase * FLUTTER_HZ) *
        (0.4 + 0.6 * u * u);

      array[i * 3 + 2] = z;
    }
    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  });

  return (
    <mesh
      castShadow
      geometry={geometry}
      ref={(node) => {
        meshRef.current = node;
        onMeshRef?.(node);
      }}
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
