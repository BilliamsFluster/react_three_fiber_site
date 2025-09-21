import { useEffect } from 'react';
import { Color, Fog } from 'three';
import { useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Sparkles, Stars } from '@react-three/drei';

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
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[12, 64]} />
          <meshStandardMaterial
            color="#091224"
            roughness={0.55}
            metalness={0.4}
            emissive="#0f264d"
            emissiveIntensity={0.35}
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#03040a" roughness={0.9} metalness={0.05} />
        </mesh>
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
