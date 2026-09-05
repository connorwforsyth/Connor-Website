"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { DoubleSide, type Group } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { criticallyDampedAt } from "./spring";

// World units are CSS pixels: an A4 sheet at 96dpi. The DOM sheet is sized
// to exactly these numbers so the shadow caster lines up with the page the
// reader actually sees.
export const PAPER_WIDTH = 794;
export const PAPER_HEIGHT = 1123;

// Quick, quiet landing: a short drop that settles in about a second.
// The 3D-ness should register as texture, not as a performance. Each sheet
// gets a slightly different fall — a shared feel, not a repeated one.
const DROP_HEIGHT_BY_INDEX = [200, 235];
const DROP_OMEGA_BY_INDEX = [4.2, 3.7];
const DRIFT_BY_INDEX = [14, 20];
const DRIFT_OMEGA_BY_INDEX = [3.4, 3];
// Resting height above the table. Big enough that the daylight shadow
// reads as a soft offset rather than a hard outline, small enough that the
// sheet still looks like it is lying down rather than floating.
const REST_HOVER = 11;
const TILT_PER_SPEED = 0.000_24; // rad of rotateX per px/s of descent
const TWIST_PER_SPEED = 0.000_35; // rad of rotateZ per px/s of drift
const REST_TWISTS_RAD = [0.004, -0.003];
const FADE_IN = 0.25;

type PaperPageProps = {
  centerY: number;
  dropDelay: number;
  element: HTMLElement;
  index: number;
  reduceMotion: boolean;
  replayToken: number;
};

/**
 * One sheet of the CV. The page you read is `element` — a real DOM node
 * full of real HTML, positioned in 3D by CSS3DRenderer — so its text stays
 * vector-sharp, selectable and linkable at any zoom.
 *
 * The mesh in here is never drawn. It exists only to cast the sheet's
 * shadow onto the table in the WebGL layer behind, which is the one thing
 * CSS cannot do honestly: a real soft shadow that tracks the page's tilt
 * as it falls.
 */
export function PaperPage({
  centerY,
  dropDelay,
  element,
  index,
  reduceMotion,
  replayToken,
}: PaperPageProps) {
  const groupRef = useRef<Group>(null);
  const startedAt = useRef<number | undefined>(undefined);
  const lastReplayToken = useRef(replayToken);
  const lastOpacity = useRef(-1);

  const cssObject = useMemo(() => new CSS3DObject(element), [element]);

  const direction = index % 2 === 0 ? 1 : -1;
  const restTwist = REST_TWISTS_RAD[index] ?? 0;
  const dropHeight = DROP_HEIGHT_BY_INDEX[index] ?? DROP_HEIGHT_BY_INDEX[0];
  const dropOmega = DROP_OMEGA_BY_INDEX[index] ?? DROP_OMEGA_BY_INDEX[0];
  const driftAmount = DRIFT_BY_INDEX[index] ?? DRIFT_BY_INDEX[0];
  const driftOmega = DRIFT_OMEGA_BY_INDEX[index] ?? DRIFT_OMEGA_BY_INDEX[0];

  useFrame((state) => {
    const group = groupRef.current;
    if (!group) {
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

    group.position.set(drift.position, centerY, REST_HOVER + height.position);
    group.rotation.x = speed * TILT_PER_SPEED;
    group.rotation.z = restTwist + drift.velocity * TWIST_PER_SPEED;

    const opacity = Math.min(1, Math.max(0, (local + FADE_IN) / FADE_IN));
    if (opacity !== lastOpacity.current) {
      element.style.opacity = `${opacity}`;
      lastOpacity.current = opacity;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Invisible in the colour pass — the DOM sheet in front of the
          canvas is what you see — but still a shadow caster. */}
      <mesh castShadow>
        <planeGeometry args={[PAPER_WIDTH, PAPER_HEIGHT]} />
        {/* shadowSide matters: three renders the shadow pass with back
            faces by default, so a single-sided plane would cast nothing
            at all. */}
        <meshBasicMaterial
          colorWrite={false}
          depthWrite={false}
          shadowSide={DoubleSide}
        />
      </mesh>
      <primitive object={cssObject} />
    </group>
  );
}
