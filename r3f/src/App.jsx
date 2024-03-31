import { Canvas } from '@react-three/fiber'
import { useFrame, useThree, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';

import './App.css'
import { useRef, useState, useEffect} from 'react'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { MeshDistortMaterial, MeshWobbleMaterial, useHelper,  } from '@react-three/drei'

import About from './components/about'
import Portfolio from './components/portfolio'
import Hero from './components/hero'
import SimpleModel from './threeComponents/model'
import { DirectionalLightHelper, Object3D, SpotLightHelper, Vector3 } from 'three'
import { useControls } from 'leva'
import SimpleSpotLightWithTarget from './threeComponents/SimpleSpotLight'
import CameraController from './threeComponents/SimpleCameraController'
import NightTimeProcessing from './components/nightTimeProcessing'
import SimpleTextModel from './threeComponents/TextModel'
import { DisplayProvider, useDisplay } from './threeComponents/DisplayContextManager'
import Contact from './components/contact';




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
  
  const Scene = ({ controlsEnabled }) =>{
    
  return (
    <>
    
      <CameraController />
      
      
      
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

      <SimpleSpotLightWithTarget
        initialPosition={[-3.12, 3.07, 2.66]}
        initialTargetPosition = {[0.2,-5.128,-0.49]}
        intensity={10}
        color={'#FFDE56'}
        angle={1.45}
        penumbra={0.4}
        
        
      />

      
        
           
<SimpleModel 
  model="../models/cyberScene.glb"
  
  position={[0, 0, 0]} 
  rotation={[0, -Math.PI / 6, 0]}
/>
<SimpleTextModel model={'../models/About.glb'} componentToShow={About} position = {[-2.863,4.025,1.705]} rotation = {[0,-0.543,0]}/>
<SimpleSpotLightWithTarget
        initialPosition={[0.537,4.025,1.705]}
        initialTargetPosition = {[-6.662,4.324,-1.095]}
        intensity={10}
        color={'red'}
        angle={0.6}
        penumbra={1} 
        
        
      />
<SimpleTextModel model = {'../models/Portfolio.glb'} componentToShow={Portfolio} position = {[1.082,2.495,-1.589]} rotation = {[3.14,-1.045,3.14]} />
<SimpleSpotLightWithTarget
        initialPosition={[1.382,2.895,1.111]}
        initialTargetPosition = {[17.881,1.795,-26.289]}
        intensity={10}
        color={'white'}
        angle={0.94}
        penumbra={1}
        
        
      />
<SimpleTextModel model = {'../models/Contact.glb'} componentToShow={Contact}  position = {[1.685,6.965,-1.829]} rotation = {[3.14,-1.037, 3.14]} />
<SpotLightWithTarget
        initialPosition={[1.537,7.724,3.105]}
        initialTargetPosition = {[49.236,11.425,-151.2]}
        intensity={20}
        color={'#2EDCDA'}
        angle={0.6}
        penumbra={1} 
        active = {true}
        
      />
    
    </>
  )
}

const App = () => {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const hideOverlay = () => {
    setControlsEnabled(true); // Re-enable scene controls
    setIsOverlayVisible(false); // Hide the overlay
  };
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      direction: 'vertical',
    });
  
    function raf() {
      lenis.raf();
      requestAnimationFrame(raf);
    }
  
    raf();
    
    return () => cancelAnimationFrame(raf);
  }, []);
   // Adjust the pointer events on the canvas container based on controlsEnabled
   useEffect(() => {
    const canvasContainer = document.getElementById('canvas-container');
    if (canvasContainer) {
      canvasContainer.style.pointerEvents = controlsEnabled ? 'auto' : 'none';
    }
  }, [controlsEnabled]);
  return(
    <>
      <div className='parent-container'>
        <DisplayProvider>

        

        <div id = 'canvas-container'>
        <Canvas>
          <Scene controlsEnabled={controlsEnabled}/>
          
          <NightTimeProcessing
        nighttimeIntensity={0}
        fogNear={0}
        fogFar={0}
        fogColor={"purple"}
      />
          
        </Canvas>
        </div>
        <DisplayedComponent 
        setControlsEnabled={setControlsEnabled}
        hideOverlay={hideOverlay} // Pass down the hideOverlay function
        isVisible={isOverlayVisible}/>
        </DisplayProvider>
      </div>
      
      
      </>
      
    )
}

const DisplayedComponent = ({ hideOverlay, setControlsEnabled }) => {
  const { displayComponent: Component, isVisible, hideComponent } = useDisplay();

  useEffect(() => {
    // Toggle the visibility with GSAP animations based on isVisible
    gsap.to('.overlay-content', { autoAlpha: isVisible ? 1 : 0, duration: 0.5 });

    // Adjust pointer events and scene interaction based on visibility
    if (isVisible) {
      setControlsEnabled(false); // Disable scene interactions when overlay is visible
    }
  }, [isVisible, setControlsEnabled]);

  // Enhanced hideOverlay to include context's hideComponent for managing visibility
  const combinedHideOverlay = () => {
    // Start the fade-out animation
    gsap.to('.overlay-content', {
      autoAlpha: 0, // Target opacity
      duration: 0.5,
      onComplete: () => {
        // This code executes after the fade-out animation completes
        hideOverlay();  // Intended to re-enable scene controls
        hideComponent(); // Actually hides the overlay component
      }
    });
  };

  return (
    <div className="overlay-content" style={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? 'auto' : 'none' }}>
      {/* Pass combinedHideOverlay down to the Component */}
      {Component ? <Component hideOverlay={combinedHideOverlay} /> : null}
    </div>
  );
};


export default App
