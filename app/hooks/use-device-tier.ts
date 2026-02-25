import { useState, useEffect } from "react";

export type DeviceTier = "full3d" | "simple3d" | "css";

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("css");

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) {
      setTier("css");
      return;
    }

    // Check WebGL availability
    let webglAvailable = false;
    try {
      const canvas = document.createElement("canvas");
      webglAvailable = !!(
        canvas.getContext("webgl2") || canvas.getContext("webgl")
      );
    } catch {
      // WebGL not available
    }

    if (!webglAvailable) {
      setTier("css");
      return;
    }

    // Check device capability
    const isMobile = window.innerWidth < 768;
    const lowCores =
      navigator.hardwareConcurrency !== undefined &&
      navigator.hardwareConcurrency <= 4;

    if (isMobile || lowCores) {
      setTier("simple3d");
    } else {
      setTier("full3d");
    }
  }, []);

  return tier;
}
