import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─────────────────────────────────────────────
// APPLE-STYLE MAIN ABOUT ORB (3D IMAGE HOLDER)
// ─────────────────────────────────────────────
const GlassOrb = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    // Smooth premium rotation
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;

    // Floating "breathing" motion
    ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.2;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref}>
        <sphereGeometry args={[1.8, 128, 128]} />

        {/* 🔥 Apple-style glass material */}
        <MeshTransmissionMaterial
          transmission={1}
          roughness={0}
          thickness={0.5}
          ior={1.4}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.2}
          temporalDistortion={0.1}
        />
      </mesh>
    </Float>
  );
};

// ─────────────────────────────────────────────
// SUBTLE GLOW RING (premium depth)
// ─────────────────────────────────────────────
const GlowRing = () => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.getElapsedTime() * 0.2;
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.04, 16, 100]} />
      <meshBasicMaterial color="#a855f7" />
    </mesh>
  );
};

// ─────────────────────────────────────────────
// MAIN COMPONENT (USED IN ABOUT PAGE)
// ─────────────────────────────────────────────
export const AboutFloatingOrb = () => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        zIndex: 0,
        pointerEvents: "none", // does not block UI
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        {/* Lighting — soft Apple style */}
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#d946ef" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#7c3aed" />

        {/* Main Orb */}
        <GlassOrb />

        {/* Glow ring */}
        <GlowRing />
      </Canvas>
    </div>
  );
};