import React, { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────
// Props Type
// ─────────────────────────────────────────────
type Props = {
  modelUrl?: string;
};

// ─────────────────────────────────────────────
// Model Component (Handles 3D object + animation)
// ─────────────────────────────────────────────
const Model = ({ url }: { url?: string }) => {
  const ref = useRef<THREE.Group>(null);

  // Prevent loading if no model from admin
  if (!url) return null;

  // Load model dynamically
  const { scene } = useGLTF(url);

  // Optional: clone scene to avoid mutation issues
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // ─────────────────────────────────────────
  // Animation Loop (runs every frame)
  // ─────────────────────────────────────────
  useFrame((state) => {
    if (!ref.current) return;

    const elapsed = state.clock.elapsedTime;

    // Floating motion (smooth vertical oscillation)
    ref.current.position.y = Math.sin(elapsed * 1.2) * 0.3;

    // Continuous rotation (main hero effect)
    ref.current.rotation.y += 0.004;

    // Mouse interaction (tilt effect)
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

  // Render model
  return (
    <group ref={ref} scale={1.5} dispose={null}>
      <primitive object={clonedScene} />
    </group>
  );
};

// ─────────────────────────────────────────────
// HeroScene Component (Canvas + Lighting + Scene)
// ─────────────────────────────────────────────
export const HeroScene = ({ modelUrl }: Props) => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">

      <Canvas
        camera={{
          position: [0, 0, 6],
          fov: 45,
        }}
        gl={{
          alpha: true,
          antialias: true,
        }}
      >

        {/* ───────────── Lighting Setup ───────────── */}

        {/* Base ambient light */}
        <ambientLight intensity={0.6} />

        {/* Key light */}
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />

        {/* Fill light (soft purple tone) */}
        <directionalLight
          position={[-5, -3, 2]}
          intensity={0.5}
          color="#f0abfc"
        />

        {/* Accent light (front glow) */}
        <pointLight
          position={[0, 2, 4]}
          intensity={1.2}
          color="#a855f7"
        />

        {/* Environment for subtle reflections */}
        <Environment preset="city" />

        {/* Depth fog (matches dark UI) */}
        <fog attach="fog" args={["#020617", 8, 20]} />

        {/* ───────────── Model Loader ───────────── */}

        <Suspense fallback={null}>
          <Model url={modelUrl} />
        </Suspense>

        {/* ───────────── Controls (disabled interaction) ───────────── */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />

      </Canvas>
    </div>
  );
};