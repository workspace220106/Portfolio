"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Environment } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* ─── Immersive 3D Character Portrait ─── */
function Portrait() {
  const meshRef = useRef<THREE.Mesh>(null);

  const texture = useLoader(THREE.TextureLoader, "/hero-portrait.png");
  // ensure correct color rendering
  texture.colorSpace = THREE.SRGBColorSpace;

  const aspect = texture.image
    ? texture.image.width / texture.image.height
    : 1;

  const height = 5.5;
  const width = height * aspect;

  useFrame((state) => {
    if (meshRef.current) {
      // Smooth interactive 3D parallax
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        (state.pointer.x * Math.PI) / 12,
        0.05
      );
      meshRef.current.rotation.x = THREE.MathUtils.lerp(
        meshRef.current.rotation.x,
        -(state.pointer.y * Math.PI) / 16,
        0.05
      );
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[0, -0.2, 0]}>
        <planeGeometry args={[width, height, 128, 128]} />
        <meshStandardMaterial
          map={texture}
          displacementMap={texture}
          displacementScale={0.3}
          displacementBias={-0.1}
          roughness={0.6}
          metalness={0.3}
          transparent
          side={THREE.DoubleSide}
          onBeforeCompile={(shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              '#include <dithering_fragment>',
              `
              #include <dithering_fragment>
              #ifdef USE_MAP
                vec4 myTexColor = texture2D(map, vMapUv);
                
                // Advanced Luma Key to remove fake PNG checkerboards
                // A fake checkerboard uses #FFFFFF and #CCCCCC (brightness ~0.8 to 1.0) and is pure grayscale
                float brightness = (myTexColor.r + myTexColor.g + myTexColor.b) / 3.0;
                
                float cMin = min(min(myTexColor.r, myTexColor.g), myTexColor.b);
                float cMax = max(max(myTexColor.r, myTexColor.g), myTexColor.b);
                float chroma = cMax - cMin;
                
                // If it's brighter than 0.74 AND it is perfectly grayscale (chroma < 0.05), it is the checkerboard background.
                float isBackground = smoothstep(0.74, 0.75, brightness) * step(chroma, 0.05);
                
                // Remove the background entirely
                gl_FragColor.a *= (1.0 - isBackground);
                
                // Smoothly fade out edges (especially the bottom torso cut-off)
                float edgeX = smoothstep(0.0, 0.05, vMapUv.x) * smoothstep(1.0, 0.95, vMapUv.x);
                float edgeY = smoothstep(0.0, 0.35, vMapUv.y) * smoothstep(1.0, 0.95, vMapUv.y);
                gl_FragColor.a *= (edgeX * edgeY);
              #endif
              `
            );
          }}
        />
      </mesh>
    </group>
  );
}


/* ─── Holographic Particles around portrait ─── */
function HoloParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 1.2;
      const y = (Math.random() - 0.5) * 3;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius * 0.5;
    }
    return pos;
  }, []);

  const sizes = useMemo(() => {
    const s = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 0.03 + 0.01;
    }
    return s;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const t = state.clock.getElapsedTime();
    particlesRef.current.rotation.y = t * 0.1;
    const posArray = particlesRef.current.geometry.attributes.position
      .array as Float32Array;
    for (let i = 0; i < count; i++) {
      posArray[i * 3 + 1] += Math.sin(t + i) * 0.001;
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#947EB0"
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Orbit Rings ─── */
function OrbitRings() {
  const ref1 = useRef<THREE.Mesh>(null);
  const ref2 = useRef<THREE.Mesh>(null);
  const ref3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref1.current) {
      ref1.current.rotation.z = t * 0.5;
      ref1.current.rotation.x = Math.PI / 3 + Math.sin(t * 0.3) * 0.1;
    }
    if (ref2.current) {
      ref2.current.rotation.y = t * -0.4;
      ref2.current.rotation.z = Math.PI / 4 + Math.cos(t * 0.2) * 0.15;
    }
    if (ref3.current) {
      ref3.current.rotation.x = t * 0.3;
      ref3.current.rotation.y = Math.PI / 6 + Math.sin(t * 0.4) * 0.2;
    }
  });

  return (
    <group>
      <mesh ref={ref1}>
        <torusGeometry args={[1.8, 0.008, 16, 100]} />
        <meshStandardMaterial
          color="#947EB0"
          emissive="#947EB0"
          emissiveIntensity={1.5}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.4}
        />
      </mesh>
      <mesh ref={ref2} scale={1.2}>
        <torusGeometry args={[1.8, 0.006, 16, 100]} />
        <meshStandardMaterial
          color="#3B82F6"
          emissive="#3B82F6"
          emissiveIntensity={2}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh ref={ref3} scale={0.8}>
        <torusGeometry args={[1.8, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#6C3AED"
          emissive="#6C3AED"
          emissiveIntensity={1.5}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
}

/* ─── Orbit Dot ─── */
function OrbitDot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const angle = t * 0.8;
    ref.current.position.x = Math.cos(angle) * 1.8;
    ref.current.position.y = Math.sin(angle) * 1.8 * Math.sin(Math.PI / 3);
    ref.current.position.z = Math.sin(angle) * 1.8 * Math.cos(Math.PI / 3);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 16, 16]} />
      <meshStandardMaterial
        color="#FBFEFB"
        emissive="#FBFEFB"
        emissiveIntensity={3}
      />
    </mesh>
  );
}

/* ─── Floating Accent Orbs ─── */
function FloatingOrbs() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
    groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.1;
    groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.1;
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.4} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[2.0, 0.6, -0.8]}>
          <icosahedronGeometry args={[0.2, 0]} />
          <meshPhysicalMaterial
            color="#947EB0"
            metalness={0.95}
            roughness={0.05}
            emissive="#2F0A85"
            emissiveIntensity={0.7}
            clearcoat={1}
            iridescence={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={0.9}>
        <mesh position={[-1.8, -0.3, 0.4]}>
          <dodecahedronGeometry args={[0.18, 0]} />
          <meshPhysicalMaterial
            color="#2F0A85"
            metalness={0.95}
            roughness={0.1}
            clearcoat={0.5}
            emissive="#947EB0"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[0.5, 1.8, 0.1]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshPhysicalMaterial
            color="#FBFEFB"
            metalness={0.7}
            roughness={0.05}
            emissive="#947EB0"
            emissiveIntensity={0.6}
            clearcoat={1}
            transmission={0.3}
            thickness={0.5}
          />
        </mesh>
      </Float>
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh position={[-1.2, 1.3, -1.0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshPhysicalMaterial
            color="#947EB0"
            metalness={0.9}
            roughness={0.1}
            emissive="#2F0A85"
            emissiveIntensity={0.5}
            clearcoat={1}
          />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── Moving Cinematic Lights ─── */
function MovingLights() {
  const light1Ref = useRef<THREE.PointLight>(null);
  const light2Ref = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (light1Ref.current) {
      light1Ref.current.position.x = Math.sin(t * 0.5) * 3;
      light1Ref.current.position.y = Math.cos(t * 0.3) * 2;
    }
    if (light2Ref.current) {
      light2Ref.current.position.x = Math.cos(t * 0.4) * -3;
      light2Ref.current.position.z = Math.sin(t * 0.6) * 3;
    }
  });

  return (
    <group>
      <pointLight ref={light1Ref} intensity={2} color="#00ffcc" distance={10} />
      <pointLight ref={light2Ref} intensity={2} color="#ff00cc" distance={10} />
    </group>
  );
}

/* ─── Flowing Energy Lines ─── */
function EnergyLines() {
  const linesRef = useRef<THREE.Group>(null);
  const count = 5;

  const curves = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      return new THREE.CatmullRomCurve3([
        new THREE.Vector3(-5, Math.sin(i) * 2, -2 + i * 0.5),
        new THREE.Vector3(-2, Math.cos(i) * 1.5, -1 + i * 0.5),
        new THREE.Vector3(0, Math.sin(i) * -1, 0 + i * 0.2),
        new THREE.Vector3(2, Math.cos(i) * 1.5, 1 + i * 0.5),
        new THREE.Vector3(5, Math.sin(i) * -2, 2 + i * 0.5)
      ]);
    });
  }, [count]);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      linesRef.current.children.forEach((child, i) => {
        child.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3 + i) * 0.1;
      });
    }
  });

  return (
    <group ref={linesRef} position={[0, -1, -2]}>
      {curves.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 64, 0.015, 8, false]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#00ffcc" : "#ff00cc"}
            emissive={i % 2 === 0 ? "#00ffcc" : "#ff00cc"}
            emissiveIntensity={2}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Main HeroCanvas Export ─── */
export function HeroCanvas() {
  return (
    <div className="h-full w-full" style={{ minHeight: "100vh" }}>
      <Canvas
        camera={{ position: [0.8, 0, 3.5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["transparent"]} />

        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#FBFEFB" />
        <pointLight position={[-3, -1, -3]} intensity={0.8} color="#2F0A85" />
        <pointLight position={[0, 2, -4]} intensity={0.5} color="#947EB0" />
        <pointLight position={[2, -2, 2]} intensity={0.3} color="#947EB0" />
        {/* Rim lights for cinematic effect */}
        <pointLight position={[-2, 0, 1]} intensity={0.6} color="#6C3AED" />
        <pointLight position={[2, 0, 1]} intensity={0.4} color="#3B82F6" />

        <Suspense fallback={null}>
          <Environment preset="night" />

          {/* Portrait offset to the right so text on the left is clear */}
          <group position={[1.2, 0, 0]}>
            <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.15}>
              <Portrait />
            </Float>
          </group>

          <HoloParticles />
          <FloatingOrbs />
          <MovingLights />

          <Stars
            radius={12}
            depth={50}
            count={3000}
            factor={0.4}
            saturation={0.8}
            fade
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
