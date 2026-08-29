"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { type Mesh, Vector3 } from "three";
import type { CvLinkRect } from "./cv-links.generated";
import { PAPER_HEIGHT, PAPER_WIDTH } from "./paper-page";

// The four corners of a rect in unit (0..1) space, used to find the
// on-screen bounding box of a link even under the sheet's small rest tilt.
const UNIT_CORNERS = [
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1],
] as const;

type LinkOverlayProps = {
  anchorRefs: React.RefObject<(HTMLAnchorElement | null)[][]>;
  meshRefs: React.RefObject<(Mesh | null)[]>;
  pages: CvLinkRect[][];
};

/**
 * Projects each link's rect from its page mesh's live 3D transform to
 * screen space every frame, and moves real DOM `<a>` elements there — real
 * tab order, real hover, real click, right on top of the texture. Mounted
 * inside the Canvas for useFrame, but renders nothing itself: the anchors
 * are plain DOM siblings of the canvas (rendered by PaperScene) so they
 * aren't part of the R3F scene graph — a portal from inside the R3F
 * reconciler can't host plain DOM tags.
 */
export function LinkOverlay({ anchorRefs, meshRefs, pages }: LinkOverlayProps) {
  const point = useRef(new Vector3());

  useFrame((state) => {
    const meshes = meshRefs.current;
    const { width, height } = state.size;

    for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
      const mesh = meshes[pageIndex];
      const rects = pages[pageIndex];
      const anchors = anchorRefs.current[pageIndex];
      if (!mesh) {
        continue;
      }
      mesh.updateWorldMatrix(true, false);

      for (let linkIndex = 0; linkIndex < rects.length; linkIndex += 1) {
        const el = anchors[linkIndex];
        const rect = rects[linkIndex];
        if (!el) {
          continue;
        }

        let minX = Number.POSITIVE_INFINITY;
        let minY = Number.POSITIVE_INFINITY;
        let maxX = Number.NEGATIVE_INFINITY;
        let maxY = Number.NEGATIVE_INFINITY;
        for (const [u, v] of UNIT_CORNERS) {
          const localX = rect.x + u * rect.width - PAPER_WIDTH / 2;
          const localY = PAPER_HEIGHT / 2 - (rect.y + v * rect.height);
          point.current.set(localX, localY, 0);
          point.current.applyMatrix4(mesh.matrixWorld);
          point.current.project(state.camera);
          const screenX = ((point.current.x + 1) / 2) * width;
          const screenY = ((1 - point.current.y) / 2) * height;
          minX = Math.min(minX, screenX);
          maxX = Math.max(maxX, screenX);
          minY = Math.min(minY, screenY);
          maxY = Math.max(maxY, screenY);
        }

        el.style.left = `${minX}px`;
        el.style.top = `${minY}px`;
        el.style.width = `${maxX - minX}px`;
        el.style.height = `${maxY - minY}px`;
      }
    }
  });

  return null;
}
