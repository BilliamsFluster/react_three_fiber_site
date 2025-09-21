import React, { useRef, useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useGLTF, TransformControls } from '@react-three/drei';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import * as THREE from 'three'; // Import THREE to access PMREMGenerator and Color

const SimpleModel = ({ model, enableTransform = false, hdrSrc, ...props }) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const [mode, setMode] = useState('translate'); // State to track current mode
  const { scene, gl, camera } = useThree(); // Use useThree() to access the scene and WebGL renderer (gl)
  const { scene: loadedScene } = useGLTF(model); // Rename loaded scene to avoid confusion with the main scene

  // Preload the model
  useGLTF.preload(model);

  useEffect(() => {
    // Apply material adjustments and shadows to the loaded model
    loadedScene.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 0.4;
        child.material.roughness = 0.45;
        child.material.envMapIntensity = 1.1;
        child.castShadow = true;
        child.receiveShadow = true;
        child.material.needsUpdate = true;
      }
    });
  }, [loadedScene]);

  // Load and set HDR environment
  useEffect(() => {
    if (hdrSrc) {
      const pmremGenerator = new THREE.PMREMGenerator(gl);
      pmremGenerator.compileEquirectangularShader();

      new RGBELoader()
        .setDataType(THREE.FloatType) // HDR/RGBE needs UnsignedByteType
        .load(hdrSrc, (texture) => {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;
          pmremGenerator.dispose();

          // Apply the environment map to the scene for global illumination
          scene.environment = envMap;
        });
    }
  }, [hdrSrc, gl, scene]);

  useEffect(() => {
    const controls = transformRef.current;
    const switchMode = (event) => {
      if (event.key === 'w') {
        setMode('translate');
      } else if (event.key === 'e') {
        setMode('rotate');
      } else if (event.key === 'r') {
        setMode('scale');
      }
    };

    window.addEventListener('keydown', switchMode);

    return () => window.removeEventListener('keydown', switchMode);
  }, []);

  useEffect(() => {
    if (enableTransform && transformRef.current) {
      const currentTransform = transformRef.current;
      currentTransform.setMode(mode);
      currentTransform.space = 'local';

      const onObjectChange = () => {
        console.log(`Position: ${groupRef.current.position.toArray()}`);
        console.log(`Rotation: ${groupRef.current.rotation.toArray()}`);
        console.log(`Scale: ${groupRef.current.scale.toArray()}`);
      };

      currentTransform.addEventListener('objectChange', onObjectChange);

      return () => currentTransform.removeEventListener('objectChange', onObjectChange);
    }
  }, [enableTransform, mode]);

  return (
    <>
      {enableTransform ? (
        <TransformControls
          ref={transformRef}
          args={[camera, gl.domElement]}
          object={groupRef.current}
          mode={mode}>
          <primitive object={loadedScene} ref={groupRef} {...props} />
        </TransformControls>
      ) : (
        <primitive object={loadedScene} ref={groupRef} {...props} />
      )}
    </>
  );
};

export default SimpleModel;
