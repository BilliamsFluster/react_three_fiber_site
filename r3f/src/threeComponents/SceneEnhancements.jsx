import { useEffect } from 'react';
import { AdditiveBlending, Color, DoubleSide, Fog } from 'three';
import { useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles, Stars } from '@react-three/drei';

const SceneEnhancements = () => {
  const { scene } = useThree();

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
        count={60}
        scale={[12, 4, 12]}
        size={2.5}
        speed={0.2}
        opacity={0.75}
      />
      <group position={[0, -0.05, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#03040a" roughness={0.9} metalness={0.05} />
        </mesh>
        <group position={[0, 0.12, 0]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[6.2, 64]} />
            <meshBasicMaterial
              color="#0c1c36"
              transparent
              opacity={0.18}
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.25, 0]}>
            <circleGeometry args={[5.5, 64]} />
            <meshBasicMaterial
              color="#13345a"
              transparent
              opacity={0.12}
              depthWrite={false}
              blending={AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[5.5, 6.5, 1.1, 48, 1, true]} />
            <meshBasicMaterial
              color="#13345a"
              transparent
              opacity={0.2}
              depthWrite={false}
              blending={AdditiveBlending}
              side={DoubleSide}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>
      <group position={[0, 0.08, 0]}>
        {[[-2.6, 0, 2.4], [2.6, 0, 2.4], [-2.6, 0, -2.4], [2.6, 0, -2.4]].map((position, index) => (
          <mesh key={`plate-${index}`} position={position} castShadow receiveShadow>
            <boxGeometry args={[1.6, 0.12, 2.8]} />
            <meshStandardMaterial
              color="#091427"
              emissive="#1c6cff"
              emissiveIntensity={0.75}
              metalness={0.35}
              roughness={0.4}
            />
          </mesh>
        ))}
      </group>
      <group position={[0, 1.8, 0]}>
        <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.6}>
          <mesh position={[-2.1, 0.2, 0]} castShadow>
            <icosahedronGeometry args={[0.3, 1]} />
            <meshStandardMaterial
              color="#67f7ff"
              emissive="#67f7ff"
              emissiveIntensity={2.4}
              metalness={0.1}
              roughness={0.25}
              toneMapped={false}
            />
          </mesh>
        </Float>
        <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
          <mesh position={[2.3, -0.1, -1.4]} castShadow>
            <octahedronGeometry args={[0.24, 0]} />
            <meshStandardMaterial
              color="#ff7cdb"
              emissive="#ff7cdb"
              emissiveIntensity={2}
              metalness={0.05}
              roughness={0.3}
              toneMapped={false}
            />
          </mesh>
        </Float>
      </group>
      <group position={[0, 0.2, 4.5]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 5, 24]} />
          <meshStandardMaterial
            color="#0a6ef2"
            emissive="#0a6ef2"
            emissiveIntensity={1.8}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.7, 0]} castShadow>
          <torusGeometry args={[0.25, 0.04, 32, 64]} />
          <meshStandardMaterial
            color="#ff3ef7"
            emissive="#ff3ef7"
            emissiveIntensity={2.5}
            toneMapped={false}
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
