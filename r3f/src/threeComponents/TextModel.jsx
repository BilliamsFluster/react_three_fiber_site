import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGLTF, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useDisplay } from './DisplayContextManager';

const SimpleTextModel = ({ model, enableTransform = false, canShowComponent = true, canHover = true, componentToShow, ...props }) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const [mode, setMode] = useState('translate'); // State to track current mode
  const { scene } = useGLTF(model);
  const { camera, gl } = useThree();
  const { showComponent } = useDisplay(); // Use the context


  useEffect(() => {
    // Define the event handler
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w': // 't' for translate
          setMode('translate');
          break;
        case 'e': // 'r' for rotate
          setMode('rotate');
          break;
        case 'r': // 's' for scale
          setMode('scale');
          break;
        default:
          break;
      }
    };
  
    // Attach the event listener
    window.addEventListener('keydown', handleKeyDown);
  
    // Clean up the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
    
  useGLTF.preload(model);
  

  
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Adjust material properties here
        child.material.metalness = 0.5;
        child.material.roughness = 0.5;
        
        // Ensure materials are set to receive shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if(canHover)
  {

    // GSAP animation for hover effect
    useEffect(() => {
      groupRef.current.scale.set(1, 1, 1); // Reset scale for safety
    
      const canvas = document.querySelector('canvas'); 
    
      const scaleUp = () => {
        gsap.to(groupRef.current.scale, { duration: 0.3, x: 1.1, y: 1.1, z: 1.1 });
        if (canvas) canvas.style.cursor = 'pointer'; // Change the cursor to pointer
      };
    
      const scaleDown = () => {
        gsap.to(groupRef.current.scale, { duration: 0.3, x: 1, y: 1, z: 1 });
        if (canvas) canvas.style.cursor = ''; // Revert the cursor style
      };
    
      const object = groupRef.current;
      object.onPointerOver = scaleUp;
      object.onPointerOut = scaleDown;
    
      return () => {
        object.onPointerOver = null;
        object.onPointerOut = null;
        if (canvas) canvas.style.cursor = ''; // Clean up: revert the cursor style
      };
    }, []);
  }

  const handleTransformChange = useCallback((e) => {
    if(!groupRef.current) return;
    console.log("New Position:", groupRef.current.position);
    console.log("New rotation:", groupRef.current.rotation);
    console.log("New scale:", groupRef.current.scale);
    
  }, []);
  const handleClick = () => {
    if(canShowComponent)
      showComponent(componentToShow); 
  };

  return (
    <>
      {enableTransform && (
        <TransformControls
          ref={transformRef}
          args={[camera, gl.domElement]}
          object={groupRef.current}
          mode={mode}
          
          onChange={handleTransformChange}
        >
          <primitive
            object={scene}
            ref={groupRef}
            {...props}
            onPointerOver={(e) => {
              e.stopPropagation(); // Prevents parent elements from receiving the event
              groupRef.current.onPointerOver();
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              groupRef.current.onPointerOut();
            }}
          />
        </TransformControls>
      )}
      {!enableTransform && (
        <primitive
          object={scene}
          ref={groupRef}
          {...props}
          onPointerOver={(e) => {
            e.stopPropagation(); // Prevents parent elements from receiving the event
            groupRef.current.onPointerOver();
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            groupRef.current.onPointerOut();
          }}
          onClick={handleClick}
        />
      )}
    </>
  );
};

export default SimpleTextModel;
