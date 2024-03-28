import React, { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Model = ({ model, materialAdjustments, ...props }) => {
  const groupRef = useRef();
  const { scene } = useGLTF(model);
  useGLTF.preload(model);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Convert the existing material to MeshStandardMaterial
        const standardMaterial = new THREE.MeshStandardMaterial();
        standardMaterial.copy(child.material);

        // Apply specified changes for this material
        const changes = materialAdjustments[child.material.name];
        if (changes) {
          if (changes.color) standardMaterial.color = new THREE.Color(changes.color);
          if (changes.emissive) standardMaterial.emissive = new THREE.Color(changes.emissive);
          if (typeof changes.metalness === 'number') standardMaterial.metalness = changes.metalness;
          if (typeof changes.roughness === 'number') standardMaterial.roughness = changes.roughness;
          if (typeof changes.emissiveIntensity === 'number') standardMaterial.emissiveIntensity = changes.emissiveIntensity;
          // Ensure material updates
          standardMaterial.needsUpdate = true;
        }

        // Replace the original material with the new MeshStandardMaterial
        child.material = standardMaterial;

        // Ensure materials are set to receive shadows
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, materialAdjustments]);

  return <primitive object={scene} ref={groupRef} {...props} />;
};

export default Model;