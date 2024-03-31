import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGLTF, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import { useDisplay } from './DisplayContextManager';

const SimpleTextModel = ({ model, enableTransform = false, componentToShow, ...props }) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const [mode, setMode] = useState('translate'); // State to track current mode
  const { scene } = useGLTF(model);
  const { camera, gl } = useThree();
  const { showComponent } = useDisplay(); // Use the context

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

  // GSAP animation for hover effect
  useEffect(() => {
    groupRef.current.scale.set(1, 1, 1); // Reset scale for safety
    const scaleUp = () => gsap.to(groupRef.current.scale, { duration: 0.5, x: 1.2, y: 1.2, z: 1.2 });
    const scaleDown = () => gsap.to(groupRef.current.scale, { duration: 0.5, x: 1, y: 1, z: 1 });

    const object = groupRef.current;
    object.onPointerOver = scaleUp;
    object.onPointerOut = scaleDown;

    return () => {
      object.onPointerOver = null;
      object.onPointerOut = null;
    };
  }, []);

  
  const handleClick = () => {
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
