import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "../../types.ts";

const ProjectCard3D = ({
  project,
  position,
  onClick,
}: any) => {
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
        onClick={() => onClick(project)}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[3, 2, 0.1]}>
          <meshStandardMaterial
            color={hovered ? "#7c3aed" : "#1e1b4b"}
          />
        </RoundedBox>

        <Text position={[0, 0, 0.2]} fontSize={0.2}>
          {project.title}
        </Text>
      </group>
    </Float>
  );
};

const CameraRig = () => {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.2;
    camera.position.x = Math.sin(t) * 8;
    camera.position.z = Math.cos(t) * 8;
    camera.lookAt(0, 0, 0);
  });

  return null;
};

export const ProjectsScene = ({ projects, onProjectClick }: any) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!ready) {
    return <div className="h-[600px] flex items-center justify-center text-white">Loading 3D...</div>;
  }

  return (
    <div className="h-[600px]">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />
        <Environment preset="studio" />
        <CameraRig />

        {projects.map((p: any, i: number) => (
          <ProjectCard3D
            key={p._id}
            project={p}
            position={[i * 4 - 4, 0, 0]}
            onClick={onProjectClick}
          />
        ))}
      </Canvas>
    </div>
  );
};