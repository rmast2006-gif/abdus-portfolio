import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, RoundedBox, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "../../types.ts";

const ProjectCard3D = ({
  project,
  position,
}: {
  project: Project;
  position: [number, number, number];
}) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
      <group
        ref={ref}
        position={position}
        onClick={() => {
          // 🔥 OPEN PROJECT ON CLICK
          if (project.liveLink) {
            window.open(project.liveLink, "_blank");
          } else if (project.githubLink) {
            window.open(project.githubLink, "_blank");
          }
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[3, 2, 0.1]} radius={0.1}>
          <meshStandardMaterial
            color={hovered ? "#7c3aed" : "#1e1b4b"}
            emissive="#7c3aed"
            emissiveIntensity={hovered ? 0.5 : 0.2}
          />
        </RoundedBox>

        <Text
          position={[0, 0, 0.1]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>
      </group>
    </Float>
  );
};

export const ProjectsScene = ({
  projects,
}: {
  projects: Project[];
}) => {
  const [mounted, setMounted] = useState(false);

  // Fix initial render issue
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[600px] flex items-center justify-center text-slate-400">
        Loading 3D...
      </div>
    );
  }

  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="h-[600px] w-full rounded-3xl overflow-hidden border border-white/5">
      <Canvas camera={{ position: [0, 0, 10], fov: 55 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} />
        <Environment preset="studio" />

        {safeProjects.map((project, i) => (
          <ProjectCard3D
            key={project._id}
            project={project}
            position={[i * 4 - 4, 0, 0]}
          />
        ))}
      </Canvas>
    </div>
  );
};