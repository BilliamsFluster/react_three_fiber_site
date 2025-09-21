import { useEffect, useMemo, useRef } from 'react';
import {
  AdditiveBlending,
  CanvasTexture,
  Color,
  DoubleSide,
  Fog,
  RepeatWrapping
} from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles, Stars, Text } from '@react-three/drei';

const SceneEnhancements = () => {
  const { scene } = useThree();
  const rotatingRingsRef = useRef([]);
  const beamRef = useRef();

  const neonGridTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    if (!context) {
      return null;
    }

    const gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#050b19');
    gradient.addColorStop(1, '#02040b');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    context.strokeStyle = 'rgba(60, 214, 255, 0.35)';
    context.lineWidth = 2;
    const step = size / 10;

    for (let i = 0; i <= size; i += step) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i, size);
      context.stroke();

      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(size, i);
      context.stroke();
    }

    context.strokeStyle = 'rgba(255, 97, 255, 0.6)';
    context.lineWidth = 4;
    context.strokeRect(step, step, size - step * 2, size - step * 2);

    const texture = new CanvasTexture(canvas);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(6, 6);
    texture.anisotropy = 8;

    return texture;
  }, []);

  const hologramTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    if (!context) {
      return null;
    }

    const gradient = context.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, 'rgba(46, 220, 218, 0.15)');
    gradient.addColorStop(0.5, 'rgba(46, 220, 218, 0.45)');
    gradient.addColorStop(1, 'rgba(18, 106, 255, 0.85)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);

    context.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    context.lineWidth = 3;
    const layers = 6;
    for (let i = 1; i < layers; i += 1) {
      const inset = (size / layers) * i;
      context.strokeRect(inset, inset, size - inset * 2, size - inset * 2);
    }

    const texture = new CanvasTexture(canvas);
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.needsUpdate = true;

    return texture;
  }, []);

  useEffect(() => {
    const previousBackground = scene.background;
    const fog = new Fog('#040714', 10, 55);

    scene.fog = fog;
    scene.background = new Color('#02040b');

    return () => {
      scene.fog = null;
      scene.background = previousBackground;
    };
  }, [scene]);

  useFrame((_, delta) => {
    rotatingRingsRef.current.forEach((ring, index) => {
      if (ring) {
        ring.rotation.z += delta * (index % 2 === 0 ? 0.35 : -0.3);
      }
    });

    if (beamRef.current) {
      beamRef.current.rotation.y += delta * 0.2;
    }
  });

  const pillarPositions = useMemo(
    () => [
      [-6.5, 0, -3.5],
      [-6.5, 0, 2.5],
      [6.5, 0, -3.5],
      [6.5, 0, 2.5]
    ],
    []
  );

  return (
    <>
      <Environment files="/hdris/SataraNight.hdr" background={false} intensity={0.9} />
      <Stars
        radius={80}
        depth={50}
        count={4000}
        factor={4}
        saturation={0}
        fade
        speed={0.3}
      />
      <Sparkles
        color="#1bc9ff"
        count={120}
        scale={[18, 5, 18]}
        size={2}
        speed={0.25}
        opacity={0.7}
      />
      <group position={[0, -0.05, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[12, 128]} />
          <meshStandardMaterial
            color="#091224"
            roughness={0.35}
            metalness={0.55}
            emissive="#0f264d"
            emissiveIntensity={0.45}
            map={neonGridTexture ?? undefined}
            transparent
            opacity={0.95}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#03040a" roughness={0.9} metalness={0.05} />
        </mesh>
      </group>
      <group position={[0, 0.1, 0]}>
        {[1.4, 1.85, 2.3].map((radius, index) => (
          <mesh
            key={`ring-${radius}`}
            position={[0, 0.25 + index * 0.18, 4.5]}
            rotation={[0, Math.PI / 2, 0]}
            castShadow
            ref={(element) => {
              rotatingRingsRef.current[index] = element;
            }}
          >
            <torusGeometry args={[radius, 0.03, 48, 256]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#52f0ff' : '#ff4ea9'}
              emissive={index % 2 === 0 ? '#52f0ff' : '#ff4ea9'}
              emissiveIntensity={2.2 - index * 0.3}
              roughness={0.15}
              metalness={0.3}
              toneMapped={false}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
        <mesh position={[0, 0.2, 4.5]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <cylinderGeometry args={[0.05, 0.05, 5.4, 32]} />
          <meshStandardMaterial
            color="#0a6ef2"
            emissive="#0a6ef2"
            emissiveIntensity={1.9}
            roughness={0.2}
            metalness={0.6}
            toneMapped={false}
          />
        </mesh>
      </group>
      {pillarPositions.map((position) => (
        <group key={position.join('-')} position={position}>
          <mesh castShadow position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 2.4, 24]} />
            <meshStandardMaterial color="#071126" roughness={0.45} metalness={0.7} />
          </mesh>
          <mesh castShadow position={[0, 2.55, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
            <meshStandardMaterial
              color="#56f1ff"
              emissive="#56f1ff"
              emissiveIntensity={3.2}
              toneMapped={false}
              transparent
              opacity={0.9}
            />
          </mesh>
          <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <circleGeometry args={[0.45, 32]} />
            <meshStandardMaterial color="#050b19" roughness={0.8} metalness={0.3} />
          </mesh>
        </group>
      ))}
      <Float speed={1.2} rotationIntensity={0.45} floatIntensity={0.6}>
        <group position={[-2.5, 2.4, -0.8]}>
          <mesh rotation={[0, Math.PI / 6, 0]}>
            <planeGeometry args={[1.8, 1]} />
            <meshStandardMaterial
              map={hologramTexture ?? undefined}
              transparent
              opacity={0.9}
              emissive="#45d7ff"
              emissiveIntensity={1.8}
              roughness={0.25}
              metalness={0.15}
              side={DoubleSide}
            />
          </mesh>
          <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]}
            >
            <ringGeometry args={[0.55, 0.62, 64]} />
            <meshBasicMaterial
              color="#45d7ff"
              transparent
              opacity={0.6}
              blending={AdditiveBlending}
              side={DoubleSide}
            />
          </mesh>
        </group>
      </Float>
      <Float speed={0.9} rotationIntensity={0.2} floatIntensity={0.4}>
        <group position={[2.8, 2.1, 1.4]}>
          <Text
            color="#91f6ff"
            fontSize={0.36}
            maxWidth={2.4}
            lineHeight={1.2}
            letterSpacing={0.04}
            textAlign="left"
            toneMapped={false}
          >
            Immersive nightshift hub
          </Text>
          <mesh position={[0, -0.45, 0]}>
            <boxGeometry args={[2.4, 0.05, 0.05]} />
            <meshStandardMaterial
              color="#ff4fa3"
              emissive="#ff4fa3"
              emissiveIntensity={1.8}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>
      <group ref={beamRef} position={[0, 0.6, -4]}>
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.3, 0.05, 3.2, 64, 1, true]} />
          <meshBasicMaterial
            color="#2edcda"
            transparent
            opacity={0.25}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.8, 0.82, 64]} />
          <meshBasicMaterial
            color="#2edcda"
            transparent
            opacity={0.5}
            blending={AdditiveBlending}
            side={DoubleSide}
          />
        </mesh>
      </group>
      <ContactShadows
        position={[0, -0.025, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        opacity={0.6}
        width={18}
        height={18}
        blur={2.7}
        far={30}
      />
    </>
  );
};

export default SceneEnhancements;
