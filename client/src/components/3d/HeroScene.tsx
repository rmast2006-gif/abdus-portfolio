import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

// ✅ Preload fallback model (optional but good)
useGLTF.preload("/default.glb");

// ✅ Props type
type Props = {
  modelUrl: string;
};

// 🔹 Model Loader
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

export const HeroScene = ({ modelUrl }: Props) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true }} // 🔥 makes background transparent
      >
        {/* 🔥 REMOVE BLUE BACKGROUND */}
        <color attach="background" args={["transparent"]} />

        {/* Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        {/* Model (with fallback) */}
        <Suspense fallback={null}>
          {modelUrl ? (
            <Model url={modelUrl} />
          ) : (
            <Model url="/default.glb" />
          )}
        </Suspense>

        {/* Controls */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};