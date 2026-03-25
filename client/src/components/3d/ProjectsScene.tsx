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

  // ✅ Load project image texture (UNCHANGED LOGIC)
  const texture = new THREE.TextureLoader().load(
    (project as any).image || (project as any).thumbnail || "/placeholder.png"
  );

  useFrame((_, delta) => {
    if (!ref.current) return;

    // 🔥 KEEP ORIGINAL ROTATION (NO CHANGE)
    ref.current.rotation.y += delta * 0.25;

    // 🔥 ADD PREMIUM FLOAT MICRO ANIMATION (UI ONLY)
    ref.current.position.y = position[1] + Math.sin(Date.now() * 0.001 + position[0]) * 0.15;
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

        {/* 🔥 BACK GLOW PLANE (NEW - PREMIUM UI ONLY) */}
        <mesh position={[0, 0, -0.15]}>
          <planeGeometry args={[5.5, 4]} />
          <meshBasicMaterial
            color={hovered ? "#22c55e" : "#16a34a"}
            transparent
            opacity={hovered ? 0.25 : 0.12}
          />
        </mesh>

        {/* ✅ MAIN CARD (UNCHANGED SIZE, UPGRADED MATERIAL) */}
        <RoundedBox args={[4.5, 3, 0.2]} radius={0.25}>
          <meshStandardMaterial
            map={texture}
            color="#ffffff"
            metalness={0.6} // 🔥 MORE PREMIUM
            roughness={0.25} // 🔥 SMOOTHER REFLECTION
            emissive={hovered ? "#14532d" : "#000000"} // 🔥 GREEN GLOW ON HOVER
            emissiveIntensity={hovered ? 0.6 : 0}
          />
        </RoundedBox>

        {/* 🔥 EDGE LIGHT FRAME (NEW) */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(4.6, 3.1, 0.25)]} />
          <lineBasicMaterial color={hovered ? "#22c55e" : "#064e3b"} />
        </lineSegments>

        {/* ✅ TITLE (UNCHANGED POSITION) */}
        <Text
          position={[0, -1.8, 0.3]}
          fontSize={0.35}
          color={hovered ? "#22c55e" : "white"} // 🔥 GREEN HOVER
          anchorX="center"
          anchorY="middle"
        >
          {project.title}
        </Text>

        {/* 🔥 SUBTLE SHADOW PLANE (NEW DEPTH) */}
        <mesh position={[0, -2.2, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[2.5, 32]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.25} />
        </mesh>

      </group>
    </Float>
  );
};

// 🔥 MAIN SCENE
const ProjectsScene = ({ projects }: { projects: Project[] }) => {
  const safeProjects = Array.isArray(projects) ? projects : [];

  // ✅ KEEP ORIGINAL LOGIC
  const radius = safeProjects.length === 1 ? 0 : 6;

  return (
    <div className="w-full min-h-[600px] rounded-3xl overflow-hidden border border-green-500/10 relative bg-[#021a12]">

      {/* 🔥 PREMIUM BACKGROUND GLOW (NEW) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-green-500/10 blur-[120px] top-[-100px] left-[10%]" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-400/10 blur-[100px] bottom-[-100px] right-[10%]" />
      </div>

      <Canvas
        camera={{ position: [0, 2, 10], fov: 55 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        frameloop="always"
      >

        {/* 🔥 DARK GREEN BACKGROUND */}
        <color attach="background" args={["#021a12"]} />

        {/* 🔥 IMPROVED LIGHTING */}
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-5, -3, 5]} intensity={0.6} color="#22c55e" />

        <Preload all />

        {/* 🔥 PROJECTS LAYOUT (UNCHANGED LOGIC) */}
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