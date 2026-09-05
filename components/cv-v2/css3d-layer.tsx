"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

/**
 * Walks the scene for CSS3DObjects and lays their DOM elements over the
 * canvas with a `matrix3d` derived from the same camera WebGL is using —
 * so a real HTML page can sit in the 3D scene without ever becoming an
 * image.
 *
 * Mount this as the last child of <Canvas> so its frame callback runs
 * after the sheets have written their transforms for the frame. Its
 * priority must stay at the default 0: any positive priority would switch
 * react-three-fiber to manual rendering and blank the WebGL layer.
 */
export function Css3dLayer({ container }: { container: HTMLElement | null }) {
  const scene = useThree((state) => state.scene);
  const width = useThree((state) => state.size.width);
  const height = useThree((state) => state.size.height);
  const renderer = useMemo(() => new CSS3DRenderer(), []);

  useEffect(() => {
    if (!container) {
      return;
    }
    const layer = renderer.domElement;
    layer.className = "cv-v2-css3d";
    container.appendChild(layer);
    return () => layer.remove();
  }, [container, renderer]);

  useEffect(() => {
    renderer.setSize(width, height);
  }, [renderer, width, height]);

  useFrame((state) => {
    renderer.render(scene, state.camera);
  });

  return null;
}
