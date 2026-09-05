// Shared math for fitting the fixed camera to the viewport. Used both
// inside the Canvas (to place the camera) and outside it (to size the
// scroll range against the same viewport) — kept in one place so the two
// never drift apart.

export const CAMERA_FOV = 40;
// The sheet should read close-up on every viewport, so the camera fits the
// page width to the canvas rather than sitting at a fixed distance — a
// fixed Z clips the sides on narrow, portrait screens.
const WIDTH_FILL = 0.86;
const MIN_CAMERA_Z = 900;
const MAX_CAMERA_Z = 2600;
const FOV_RAD = (CAMERA_FOV * Math.PI) / 180;

export function fitCameraZ(
  width: number,
  height: number,
  paperWidth: number
): number {
  const aspect = width / height;
  const targetWidth = paperWidth / WIDTH_FILL;
  const z = targetWidth / (2 * Math.tan(FOV_RAD / 2) * aspect);
  return Math.min(MAX_CAMERA_Z, Math.max(MIN_CAMERA_Z, z));
}

export function visibleHeightAt(z: number): number {
  return 2 * z * Math.tan(FOV_RAD / 2);
}
