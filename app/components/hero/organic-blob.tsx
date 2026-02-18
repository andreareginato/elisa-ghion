import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerformanceMonitor, Float } from "@react-three/drei";
import * as THREE from "three";
import { blobVertexShader, blobFragmentShader } from "./blob-shader";

function Blob({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseSmooth = useRef(new THREE.Vector2(0, 0));
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
      u_scroll: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;
    const material = meshRef.current.material as THREE.ShaderMaterial;
    material.uniforms.u_time.value = state.clock.elapsedTime;

    // Smooth mouse following
    mouseSmooth.current.lerp(pointer, 0.025);
    material.uniforms.u_mouse.value.copy(mouseSmooth.current);
    material.uniforms.u_scroll.value +=
      (scrollProgress - material.uniforms.u_scroll.value) * 0.04;

    // Very slow, gentle rotation
    meshRef.current.rotation.y =
      Math.sin(state.clock.elapsedTime * 0.06) * 0.2;
    meshRef.current.rotation.x =
      Math.cos(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.2}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.6, 64]} />
        <shaderMaterial
          vertexShader={blobVertexShader}
          fragmentShader={blobFragmentShader}
          uniforms={uniforms}
        />
      </mesh>
    </Float>
  );
}

export function OrganicBlob({
  scrollProgress,
}: {
  scrollProgress: number;
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 40 }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#FBF6F0"]} />
      <PerformanceMonitor>
        <Blob scrollProgress={scrollProgress} />
      </PerformanceMonitor>
    </Canvas>
  );
}
