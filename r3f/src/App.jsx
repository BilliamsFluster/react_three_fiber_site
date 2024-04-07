import { Canvas } from '@react-three/fiber'
import { gsap } from 'gsap';
import './App.css'
import {useState, useEffect} from 'react'
import About from './components/about'
import Portfolio from './components/portfolio'
import SimpleModel from './threeComponents/model'
import SimpleSpotLightWithTarget from './threeComponents/SimpleSpotLight'
import CameraController from './threeComponents/SimpleCameraController'

import SimpleTextModel from './threeComponents/TextModel'
import { DisplayProvider, useDisplay } from './threeComponents/DisplayContextManager'
import Contact from './components/contact';
import BloomFX from './threeComponents/BloomEffect';
import SpotLightWithTarget from './threeComponents/spotLightHelper';
import { AmbientLight } from 'three';


  
  const Scene = () =>{
    
  return (
    <>
    
      <CameraController />
      <ambientLight intensity={0.2} color={"#223344"} />
      <SimpleSpotLightWithTarget // light close
        initialPosition={[-0.12, 2.77, 3.16]}
        initialTargetPosition = {[2.202,-7.628,0.009]}
        intensity={40}
        color={'#FFDE56'}
        angle={0.6}
        penumbra={1} 
        canBlink = {true}
      />

      <SimpleSpotLightWithTarget // light far
        initialPosition={[-3.12, 3.07, 2.66]}
        initialTargetPosition = {[0.2,-5.128,-0.49]}
        intensity={30}
        color={'#FFDE56'}
        angle={1.45}
        penumbra={1}
        canBlink = {true} 
      />

      <SimpleSpotLightWithTarget //Car Lights
              initialPosition={[-1,0.5,1.3]}
              initialTargetPosition = {[0.5,0.6,-1.1]}
              intensity={50}
              color={'#FFDE56'}
              angle={0.51}
              penumbra={1}
              
              
            />

      
        
           
<SimpleModel 
  model="/models/cyberScene.glb"
  position={[0, 0, 0]} 
  rotation={[0, -Math.PI / 6, 0]}
/>
<SimpleTextModel model={'/models/About.glb'}  componentToShow={About} position = {[-2.379,4.465,0.709]} rotation = {[0,-0.543,0]}/>
<SimpleSpotLightWithTarget
        initialPosition={[0.537,4.025,1.705]}
        initialTargetPosition = {[-6.662,4.324,-1.095]}
        intensity={20}
        color={'red'}
        angle={0.6}
        penumbra={1} 
        canBlink = {true}
        
        
      />
<SimpleTextModel model = {'/models/Portfolio.glb'} componentToShow={Portfolio} position = {[2.621,2.495,-0.489]} rotation = {[3.14,-1.045,3.14]} />
<SimpleSpotLightWithTarget
        initialPosition={[1.382,2.895,1.111]}
        initialTargetPosition = {[17.881,1.795,-26.289]}
        intensity={10}
        color={'white'}
        angle={0.94}
        penumbra={1}
        
        
        
      />
<SimpleTextModel model = {'/models/Contact.glb'} componentToShow={Contact}  position = {[3.059,6.965,-0.947]} rotation = {[3.14,-1.037, 3.14]} />
<SimpleSpotLightWithTarget
        initialPosition={[1.537,7.724,3.105]}
        initialTargetPosition = {[49.236,11.425,-151.2]}
        intensity={50}
        color={'#2EDCDA'}
        angle={0.6}
        penumbra={1} 
        
        
        
      />
      <SimpleTextModel model = {'/models/William.glb'}  canHover = {false} canShowComponent = {false}  position = {[0,0,6.220]} rotation = {[0.04,-1.316,0.63]} />
      <SimpleTextModel model = {'/models/Wapniarek.glb'} canHover = {false} canShowComponent = {false}  position = {[4.082,0,5.097]} rotation = {[0.035,-1.286,0.625]} />
      <SimpleSpotLightWithTarget
        initialPosition={[2.8,5.3,9.8]}
        initialTargetPosition = {[1.7,0.0,5.2]}
        intensity={30}
        color={'yellow'}
        angle={0.8}
        penumbra={1}
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
    const parentContainer = document.querySelector('.parent-container');
  };
  
  
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
          <BloomFX/>
          

          <Scene controlsEnabled={controlsEnabled}/> 
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
      document.body.classList.add("scrollable");
      document.body.classList.remove("notScrollable");
      

    }
  }, [isVisible, setControlsEnabled]);
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        if (isVisible) { // Check if the overlay is visible
          combinedHideOverlay();
        }
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isVisible]);
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
        document.body.classList.remove("scrollable");
        document.body.classList.add("notScrollable");
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
