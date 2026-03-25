import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { Project } from "../../types.ts";

const ProjectCard3D = ({ project, position }: any) => {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float>
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
      >
        <RoundedBox args={[3, 2, 0.15]}>
          <meshStandardMaterial color="#1e1b4b" />
        </RoundedBox>

        <Text position={[0, 0, 0.2]} fontSize={0.25}>
          {project.title}
        </Text>
      </group>
    </Float>
  );
};

const ProjectsScene = ({ projects }: any) => {
  return (
    <div className="h-[600px] w-full">
      <Canvas camera={{ position: [0, 2, 10] }}>
        <ambientLight />
        <pointLight position={[5, 5, 5]} />

        {projects.map((p: any, i: number) => (
          <ProjectCard3D
            key={p._id}
            project={p}
            position={[i * 4 - 4, 0, 0]}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default ProjectsScene;