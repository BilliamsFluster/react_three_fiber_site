import { Canvas } from '@react-three/fiber'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import './App.css'
import { useRef, useState, useEffect} from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshDistortMaterial, MeshWobbleMaterial, useHelper,  } from '@react-three/drei'

import About from './components/about'
import Portfolio from './components/portfolio'
import Hero from './components/hero'
import Model from './components/model'
import { DirectionalLightHelper, Object3D, SpotLightHelper, Vector3 } from 'three'
import { useControls } from 'leva'
import SimpleSpotLightWithTarget from './threeComponents/SimpleSpotLight'

import NightTimeProcessing from './components/nightTimeProcessing'




const Cube = ({position, size, color})=>
{
  const ref = useRef();
  const [isHovered, setIsHovered] = useState(false);
  useFrame((state, delta)=>
  {
    const speed = isHovered?1:0.2;
    ref.current.rotation.x += delta * speed;
    
  })
  return (
    <mesh position={position} ref = {ref} 
    onPointerEnter={(event) =>(event.stopPropagation(), setIsHovered(true))}
    onPointerLeave={() =>(setIsHovered(false))}
    scale = {[2,2,2]}
    >
      <boxGeometry args={size}/>
      <meshPhongMaterial attach="material" color={color} />
    </mesh>
        
        
      
  )
}

const CameraController = () =>
{
  const {camera, gl} = useThree();
  useEffect(
    ()=>{
      const controls = new OrbitControls(camera, gl.domElement);
      controls.minDistance = 5;
      controls.maxDistance = 20;
      controls.enableZoom = true;
      return() =>{
        controls.dispose();
      };
    },
    [camera,gl]
    );
    return null;
};
const SpotLightWithTarget = ({
  initialPosition = [0, 0, 0],
  initialTargetPosition = [0, 0, 0],
  color = '#ffffff',
  intensity = 1,
  angle = Math.PI / 4,
  penumbra = 0,
  active = true,
}) => {
  const lightRef = useRef();
  const helperRef = useRef(); // Use ref to hold the helper instance
  const { scene } = useThree();

  // LEVA controls setup
  const { lightColor, lightIntensity, lightAngle, lightPenumbra, position, targetPosition } = useControls("Spotlight", {
    lightColor: { value: color, label: 'Light Color' },
    lightIntensity: { value: intensity, min: 0, max: 20, step: 0.1, label: 'Light Intensity' },
    lightAngle: { value: angle, min: 0, max: Math.PI, step: 0.01, label: 'Light Angle' },
    lightPenumbra: { value: penumbra, min: 0, max: 1, step: 0.01, label: 'Light Penumbra' },
    position: { value: initialPosition, label: 'Position', step: 0.1 },
    targetPosition: { value: initialTargetPosition, label: 'Target Position', step: 0.1 },
  }, [active]);

  useEffect(() => {
    // Ensure the spotlight and its target are properly updated
    if (lightRef.current) {
      lightRef.current.position.set(...position);
      lightRef.current.target.position.set(...targetPosition);
      lightRef.current.target.updateMatrixWorld(); // Important if the target's position influences other calculations
  
      // Now handle the helper
      if (helperRef.current) {
        // First, remove the existing helper to clear it out
        scene.remove(helperRef.current);
      }
  
      // Recreate the helper and attach it to the updated spotlight
      helperRef.current = new SpotLightHelper(lightRef.current);
      scene.add(helperRef.current);
  
      // This forces a re-render of the helper, ensuring it matches the spotlight's current state
      helperRef.current.update();
    }
  
    // Cleanup function to remove the helper when the component unmounts or when position changes
    return () => {
      if (helperRef.current) {
        scene.remove(helperRef.current);
      }
    };
  }, [scene, position, targetPosition, lightRef]);

  useEffect(() => {
    if (lightRef.current) {
      lightRef.current.target = new Object3D();
      console.log("TargetPosition: ", targetPosition);
      lightRef.current.target.position.set(...targetPosition);
      console.log("Position: ", position);
      scene.add(lightRef.current.target);
      
      // Update the helper explicitly if positions change
      if (helperRef.current) {
        helperRef.current.update();
      }
    }

    return () => {
      if (lightRef.current && lightRef.current.target) {
        scene.remove(lightRef.current.target);
      }
    };
  }, [targetPosition, position, scene]);

  return (
    <spotLight
      ref={lightRef}
      position={new Vector3(...position)} // Ensure position is spread into Vector3
      color={lightColor}
      intensity={lightIntensity}
      angle={lightAngle}
      penumbra={lightPenumbra}
    />
  );
};
  
  const Scene = () =>{
    
  return (
    <>
      <CameraController/>
      
      
      
      <ambientLight color={'white'} intensity={1}/>
      

        
        
      <SimpleSpotLightWithTarget
        initialPosition={[-0.12, 2.77, 3.16]}
        initialTargetPosition = {[2.202,-7.628,0.009]}
        intensity={10}
        color={'#FFDE56'}
        angle={0.6}
        penumbra={0.4} 
        active = {false}
      />

      <SpotLightWithTarget
        initialPosition={[-3.12, 3.07, 2.66]}
        initialTargetPosition = {[0.2,-5.128,-0.49]}
        intensity={10}
        color={'#FFDE56'}
        angle={1.45}
        penumbra={0.4}
        active = {true}
        
      />

      
        
           
<Model 
  model="../models/cyberScene.glb"
  materialAdjustments={{
    'StreetLight': { color: '#FFDE56', emissive: '#000000', emissiveIntensity: 2, metalness: 0.5, roughness: 0.4 },
    'WindowPink': { color: '#FF3ECF', emissive: '#111111',emissiveIntensity: 2 },
  }}
  position={[0, 0, 0]} 
  rotation={[0, -Math.PI / 6, 0]}
/>

    </>
  )
}

const App = () => {
  
  return(
    <>
      <div className='landingSection'>
        
        <Canvas>
          <Scene/>
          <NightTimeProcessing
        nighttimeIntensity={0}
        fogNear={0}
        fogFar={0}
        fogColor={"purple"}
      />
          
        </Canvas>
        
      </div>
      <About/>
      <Portfolio/>
      </>
      
    )
}

export default App
