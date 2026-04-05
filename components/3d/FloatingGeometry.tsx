"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function Gem({
  position,
  color,
  speed,
  size,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  size: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.3;
    ref.current.rotation.z = t * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={ref} position={position} castShadow>
        <icosahedronGeometry args={[size, 0]} />
        <MeshDistortMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          distort={0.2}
          speed={1.5}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function Ring({
  position,
  color,
  radius,
  speed,
}: {
  position: [number, number, number];
  color: string;
  radius: number;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * speed * 0.5;
    ref.current.rotation.y = t * speed * 0.3;
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={ref} position={position}>
        <torusGeometry args={[radius, 0.02, 16, 64]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#947EB0" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#2F0A85" />

      <Gem position={[-4, 2, -3]} color="#947EB0" speed={1.2} size={0.4} />
      <Gem position={[4, -1, -4]} color="#2F0A85" speed={0.9} size={0.3} />
      <Gem position={[-2, -3, -2]} color="#FBFEFB" speed={1.5} size={0.2} />
      <Gem position={[3, 3, -5]} color="#947EB0" speed={0.7} size={0.35} />
      <Gem position={[0, -2, -6]} color="#2F0A85" speed={1.1} size={0.25} />

      <Ring position={[2, 1, -3]} color="#947EB0" radius={0.8} speed={0.8} />
      <Ring position={[-3, -1, -4]} color="#2F0A85" radius={0.6} speed={1.0} />
      <Ring position={[0, 3, -5]} color="#FBFEFB" radius={1.0} speed={0.6} />
    </>
  );
}

export function FloatingGeometry() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
