import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ✅ Props
type Props = {
  modelUrl?: string;
};

// 🔹 Animated Model
const AnimatedModel = ({ url }: { url?: string }) => {
  const ref = useRef<THREE.Group>(null);

  // ✅ Prevent crash if no model
  if (!url) return null;

  const { scene } = useGLTF(url);

  // 🎯 Animation loop
  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    // ✨ Floating effect
    ref.current.position.y = Math.sin(t * 1.2) * 0.3;

    // 🔄 Smooth rotation
    ref.current.rotation.y += 0.003;

    // 🖱️ Mouse interaction
    ref.current.rotation.x = THREE.MathUtils.lerp(
      ref.current.rotation.x,
      state.mouse.y * 0.3,
      0.05
    );

    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      state.mouse.x * 0.3,
      0.05
    );
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
};

export const HeroScene = ({ modelUrl }: Props) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ alpha: true }} // ✅ transparent canvas
      >
        {/* 💡 Lighting (keeps premium look) */}
        <ambientLight intensity={0.6} />

        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -3, 2]} intensity={0.5} color="#f0abfc" />

        <pointLight position={[0, 2, 4]} intensity={1.2} color="#a855f7" />

        {/* 🌫️ Depth fog */}
        <fog attach="fog" args={["#020617", 8, 20]} />

        {/* 🎬 Model */}
        <Suspense fallback={null}>
          <AnimatedModel url={modelUrl} />
        </Suspense>

        {/* 🎥 Controls */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
};