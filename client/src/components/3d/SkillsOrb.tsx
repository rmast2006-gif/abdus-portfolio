import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

/* ---------------- CAMERA ANIMATION ---------------- */
const CameraRig = () => {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * 0.2;

    // smooth orbit
    camera.position.x = Math.sin(t) * 7;
    camera.position.z = Math.cos(t) * 7;

    // slight up/down float
    camera.position.y = Math.sin(t * 0.5) * 1;

    camera.lookAt(0, 0, 0);
  });

  return null;
};

/* ---------------- COLOR ---------------- */
const getLevelColor = (level: number) => {
  if (level >= 90) return "#a855f7";
  if (level >= 75) return "#6366f1";
  return "#38bdf8";
};

/* ---------------- ORBITING SKILL ---------------- */
const OrbitingSkill = ({
  name,
  level,
  orbitRadius,
  orbitSpeed,
  orbitTilt,
  phaseOffset,
}: any) => {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const color = getLevelColor(level);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime();
    const speed = hovered ? orbitSpeed * 0.15 : orbitSpeed;
    const angle = t * speed + phaseOffset;

    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;

    ref.current.position.x = x;
    ref.current.position.y = z * Math.sin(orbitTilt);
    ref.current.position.z = z * Math.cos(orbitTilt);
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <mesh>
        <planeGeometry args={[1.1, 0.35]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={hovered ? 0.3 : 0.15}
        />
      </mesh>

      <Text
        fontSize={hovered ? 0.16 : 0.13}
        color={hovered ? "white" : color}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.01]}
      >
        {name}
      </Text>
    </group>
  );
};

/* ---------------- CENTER ORB ---------------- */
const Nucleus = () => {
  const ref = useRef<any>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.3;
  });

  return (
    <Float speed={1.2} floatIntensity={0.6}>
      <Sphere ref={ref} args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#6d28d9"
          emissive="#4c1d95"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          distort={0.35}
          speed={1.5}
        />
      </Sphere>

      <pointLight color="#a855f7" intensity={2} distance={6} />
    </Float>
  );
};

/* ---------------- MAIN ---------------- */
export const SkillsOrb = ({ skills = [] }: any) => {
  const safeSkills = skills.length > 0 ? skills.slice(0, 10) : [
    { name: "React", level: 95 },
    { name: "Three.js", level: 90 },
    { name: "Node.js", level: 85 },
  ];

  const planes = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];

  const skillData = safeSkills.map((s: any, i: number) => ({
    ...s,
    orbitRadius: 2.2 + (i % 3) * 0.5,
    orbitSpeed: 0.25 + (i % 4) * 0.08,
    orbitTilt: planes[i % planes.length],
    phaseOffset: (i / safeSkills.length) * Math.PI * 2,
  }));

  return (
    <div className="h-[500px] w-full rounded-3xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false }} // 🔥 performance boost
      >
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.5} />
        <pointLight position={[-5, -5, -5]} intensity={1} />

        {/* Camera motion */}
        <CameraRig />

        {/* Center */}
        <Nucleus />

        {/* Skills */}
        {skillData.map((skill: any) => (
          <OrbitingSkill key={skill.name} {...skill} />
        ))}
      </Canvas>
    </div>
  );
};