import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, RoundedBox, Preload } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "../../types.ts";

// 🔥 3D Card
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
    ref.current.rotation.y += delta * 0.25;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group
        ref={ref}
        position={position}
        onClick={() => {
          if (project.liveLink) {
            window.open(project.liveLink, "_blank");
          } else if (project.githubLink) {
            window.open(project.githubLink, "_blank");
          }
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <RoundedBox args={[3, 2, 0.15]} radius={0.2}>
          <meshStandardMaterial
            color={hovered ? "#9333ea" : "#1e1b4b"}
            metalness={0.5}
            roughness={0.25}
          />
        </RoundedBox>

        <Text
          position={[0, 0, 0.2]}
          fontSize={0.25}
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

// 🔥 MAIN SCENE
const ProjectsScene = ({ projects }: { projects: Project[] }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];
  const radius = 6;

  return (
    <div className="w-full min-h-[600px] rounded-3xl overflow-hidden border border-white/5 relative">

      {/* ✅ FIX: force proper layout + prevent blue screen */}
      <Canvas
        camera={{ position: [0, 2, 10], fov: 55 }}
        dpr={[1, 2]} // ✅ smoother rendering
        gl={{ antialias: true }} // ✅ better visuals
        frameloop="always" // ✅ FIX: prevents render-on-hover bug
      >

        {/* ✅ FIX: background color (removes blue screen) */}
        <color attach="background" args={["#020617"]} />

        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />

        {/* 🔥 Preload everything (KEY FIX) */}
        <Preload all />

        {/* Circular layout */}
        {safeProjects.map((project, i) => {
          const angle =
            safeProjects.length > 0
              ? (i / safeProjects.length) * Math.PI * 2
              : 0;

          return (
            <ProjectCard3D
              key={project._id}
              project={project}
              position={[
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius,
              ]}
            />
          );
        })}
      </Canvas>
    </div>
  );
};

export default ProjectsScene;