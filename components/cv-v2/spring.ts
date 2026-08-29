export type SpringSample = { position: number; velocity: number };

const SETTLED_SECONDS = 30;

/**
 * Critically damped spring released at rest from displacement `s0`,
 * evaluated analytically at time `t`: s(t) = s0·(1 + ωt)·e^(−ωt).
 */
export function criticallyDampedAt(
  s0: number,
  omega: number,
  t: number
): SpringSample {
  if (t <= 0) {
    return { position: s0, velocity: 0 };
  }
  if (t >= SETTLED_SECONDS) {
    return { position: 0, velocity: 0 };
  }
  const decay = Math.exp(-omega * t);
  return {
    position: s0 * (1 + omega * t) * decay,
    velocity: -s0 * omega * omega * t * decay,
  };
}
