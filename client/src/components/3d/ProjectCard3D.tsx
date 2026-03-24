import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

export const ProjectCard3D = ({ position, title, onClick }: any) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <Float>
      <group
        ref={ref}
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <mesh>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color={hovered ? "#7c3aed" : "#1e1b4b"} />
        </mesh>

        <Text position={[0, -0.7, 0.1]} fontSize={0.2}>
          {title}
        </Text>
      </group>
    </Float>
  );
};