import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

interface HeroSceneProps {
  modelUrl: string;
}

// ✅ Preload (performance boost)
useGLTF.preload("/default.glb");

// 🔹 Model Loader
const Model = ({ url }: { url: string }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1.5} />;
};

export const HeroScene = ({ modelUrl }: HeroSceneProps) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        
        {/* Lights */}
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} />

        {/* Model */}
        <Suspense fallback={null}>
          {modelUrl ? (
            <Model url={modelUrl} />
          ) : (
            <Model url="/default.glb" />
          )}
        </Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
};