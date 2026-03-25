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

  // ✅ NEW: Load project image texture
  const texture = new THREE.TextureLoader().load(
    // 👇 change this if your field name is different
    (project as any).image || (project as any).thumbnail || "/placeholder.png"
  );

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

        {/* ✅ UPDATED: Bigger card with image */}
        <RoundedBox args={[4.5, 3, 0.2]} radius={0.25}>
          <meshStandardMaterial
            map={texture} // ✅ image applied
            color={hovered ? "#ffffff" : "#ffffff"}
            metalness={0.4}
            roughness={0.3}
          />
        </RoundedBox>

        {/* ✅ UPDATED: Move title below */}
        <Text
          position={[0, -1.8, 0.3]}
          fontSize={0.35}
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

  // ✅ NEW: dynamic radius (center if only 1 project)
  const radius = safeProjects.length === 1 ? 0 : 6;

  return (
    <div className="w-full min-h-[600px] rounded-3xl overflow-hidden border border-white/5 relative">

      <Canvas
        camera={{ position: [0, 2, 10], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        frameloop="always"
      >

        <color attach="background" args={["#020617"]} />

        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />

        <Preload all />

        {/* Circular layout */}
        {safeProjects.map((project, i) => {
          const angle =
            safeProjects.length > 1
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