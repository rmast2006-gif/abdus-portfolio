import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

export const ProjectCard3D = ({ position, title, onClick }: any) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;

    // ✅ ORIGINAL ROTATION (UNCHANGED)
    ref.current.rotation.y += delta * 0.2;

    // 🔥 EXTRA FLOAT MICRO-MOTION (UI ONLY)
    ref.current.position.y =
      position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.1;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={ref}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >

        {/* 🔥 BACK GLOW PLANE */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[3.6, 2.6]} />
          <meshBasicMaterial
            color={hovered ? "#22c55e" : "#14532d"}
            transparent
            opacity={hovered ? 0.25 : 0.12}
          />
        </mesh>

        {/* ✅ MAIN CARD */}
        <mesh>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial
            color={hovered ? "#22c55e" : "#021a12"} // 🔥 GREEN THEME
            metalness={0.5}
            roughness={0.3}
            emissive={hovered ? "#14532d" : "#000000"}
            emissiveIntensity={hovered ? 0.6 : 0}
          />
        </mesh>

        {/* 🔥 EDGE FRAME */}
        <lineSegments>
          <edgesGeometry args={[new THREE.PlaneGeometry(3, 2)]} />
          <lineBasicMaterial color={hovered ? "#22c55e" : "#064e3b"} />
        </lineSegments>

        {/* 🔥 SOFT SHADOW */}
        <mesh position={[0, -1.2, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.8, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.25} />
        </mesh>

        {/* 🔥 TITLE */}
        <Text
          position={[0, -0.7, 0.1]}
          fontSize={0.2}
          color={hovered ? "#22c55e" : "#ffffff"}
          anchorX="center"
          anchorY="middle"
        >
          {title}
        </Text>

        {/* 🔥 HOVER SHINE EFFECT */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3, 2]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={hovered ? 0.05 : 0}
          />
        </mesh>

      </group>
    </Float>
  );
};