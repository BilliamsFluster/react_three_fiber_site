import { useEffect } from 'react';
import { Color, Fog } from 'three';
import { useThree } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Sparkles, Stars } from '@react-three/drei';
import LocalFog from './LocalFog';

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
      <LocalFog position={[0.5, 0.75, 0]} size={[12, 2.5, 12]} opacity={0.55} heightFalloff={2.8} noiseScale={0.18} />
      <LocalFog
        position={[-2.5, 0.65, 3.1]}
        size={[6.5, 2.2, 5.5]}
        color="#22324a"
        opacity={0.42}
        noiseScale={0.3}
        speed={0.08}
      />
      <group position={[0, -0.05, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#03040a" roughness={0.9} metalness={0.05} />
        </mesh>
       
      </group>
      
      <group position={[0, 1.8, 0]}>
        
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
