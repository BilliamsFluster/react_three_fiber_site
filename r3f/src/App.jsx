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
import { DirectionalLightHelper, Object3D, SpotLightHelper } from 'three'
import { useControls } from 'leva'

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

// Custom SpotLight component that accepts a target position
const SpotLightWithTarget = ({ position, targetPosition, color, intensity, angle, penumbra }) => {
  const lightRef = useRef();
  const { scene } = useThree();
  const [canRender, setCanRender] = useState(false);
  const { spotlightPosition, spotlightTargetPosition, spotlightColor, spotlightIntensity, spotlightAngle, spotlightPenumbra } = useControls("SpotLight",{
    spotlightColor: { value: "white", label: 'Light Color', render: canRender },
    spotlightIntensity: { value: 0.5, min: 0, max: 20, step: 0.1, label: 'Light Intensity', render: canRender },
    spotlightPosition: { value: { x: 0, y: 5, z: 5 }, label: 'Light Position', render: canRender },
    spotlightTargetPosition: { value: { x: 0, y: 0, z: 0 }, label: 'Light Target Position', render: canRender },
    spotlightAngle: { value: Math.PI / 3, min: 0, max: Math.PI, step: 0.01, label: 'Light Angle' , render: canRender},
    spotlightPenumbra: { value: 0.1, min: 0, max: 1, step: 0.01, label: 'Light Penumbra', render: canRender },
  });
  useEffect(() => {
    if (lightRef.current) {
      const helper = new SpotLightHelper(lightRef.current);
      scene.add(helper);
      return () => scene.remove(helper); // Cleanup
    }
  }, [scene, lightRef]); // Re-run if these dependencies change

  useEffect(() => {
    // When the component mounts or updates, adjust the target's position
    if (lightRef.current) {
      // Ensure the light has a target; if not, create one
      if (!lightRef.current.target) {
        lightRef.current.target = new Object3D();
        scene.add(lightRef.current.target);
      }
      lightRef.current.target.position.set(spotlightTargetPosition.x, spotlightTargetPosition.y, spotlightTargetPosition.z);
    }
  
    // Cleanup function to remove the target from the scene when the component unmounts
    return () => {
      if (lightRef.current && lightRef.current.target) {
        scene.remove(lightRef.current.target);
      }
    };
  }, [spotlightTargetPosition, scene]); // Corrected to use spotlightTargetPosition
  useEffect(()=>{
    console.log(spotlightTargetPosition);
  })
  
  return (
    <spotLight
      ref={lightRef}
      position={position}
      color={spotlightColor}
      intensity={intensity}
      angle={angle}
      penumbra={penumbra}
    />
  );
};
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

const Scene = () =>{
  //const streetLight = useRef();
  const spotLight = useRef();
  const { scene } = useThree();
  /*const { lightPosition, lightTargetPosition, lightColor, lightIntensity } = useControls({
    lightColor: { value: "white", label: 'Light Color' },
    lightIntensity: { value: 1, min: 0, max: 2, step: 0.1, label: 'Light Intensity' },
    lightPosition: { value: { x: 0, y: 5, z: 5 }, label: 'Light Position' },
    lightTargetPosition: { value: { x: 0, y: 0, z: 0 }, label: 'Light Target Position' },
  });*/

  

  

  //useHelper(streetLight, DirectionalLightHelper);
  
  
  return (
    <>
      <CameraController/>
      
      
      
      <ambientLight color={'white'} intensity={1}/>
      

        
        
      <SpotLightWithTarget
        position={[-0.12, 2.77, 3.16]}
        targetPosition = {[2.202,-7.628,0.009]}
        intensity={10}
        color={'#FFDE56'}
        angle={0.6}
        penumbra={0.4}
        
      />
        
           
      <Model model = {"../models/cyberScene.glb"} position = {[0,0,0]} rotation={[0,-Math.PI/6,0]}/>
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
