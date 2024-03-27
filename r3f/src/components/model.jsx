
import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'

 const Model = ({model, ...props}) => {
  const groupRef = useRef();
  const { scene } = useGLTF(model);
  useGLTF.preload(model)
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Adjust the material properties here
        // For example, increasing metalness and roughness:
        child.material.metalness = 0.5;
        child.material.roughness = 0.5;

        // Ensure materials are set to receive shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  return <primitive object={scene} ref={groupRef} {...props} />;

};


export default Model;