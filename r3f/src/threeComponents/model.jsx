import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';

const SimpleModel = ({ model, enableTransform = false, ...props }) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const [mode, setMode] = useState('translate'); // State to track current mode
  const { scene } = useGLTF(model);
  const { camera, gl } = useThree();

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

  useEffect(() => {
    const controls = transformRef.current;
    const switchMode = (event) => {
      if (event.key === 'w') { // 't' for translate
        setMode('translate');
      } else if (event.key === 'e') { // 'r' for rotatew
        setMode('rotate');
      } else if (event.key === 'r') { // 's' for scale
        setMode('scale');
      }
    };

    window.addEventListener('keydown', switchMode);

    return () => {
      window.removeEventListener('keydown', switchMode);
    };
  }, []);

  useEffect(() => {
    if (enableTransform && transformRef.current) {
      const currentTransform = transformRef.current;
      currentTransform.setMode(mode);
      currentTransform.space = 'local';
      // Event listener for transform changes
      const onObjectChange = () => {
        console.log(`Position: ${groupRef.current.position.toArray()}`);
        console.log(`Rotation: ${groupRef.current.rotation.toArray()}`);
        console.log(`Scale: ${groupRef.current.scale.toArray()}`);
      };

      currentTransform.addEventListener('objectChange', onObjectChange);

      return () => {
        currentTransform.removeEventListener('objectChange', onObjectChange);
      };
    }
  }, [enableTransform, mode]);

  return (
    <>
      {enableTransform && (
        <TransformControls
          ref={transformRef}
          args={[camera, gl.domElement]}
          object={groupRef.current}
          mode={mode}
        >
          <primitive object={scene} ref={groupRef} {...props} />
        </TransformControls>
      )}
      {!enableTransform && <primitive object={scene} ref={groupRef} {...props} />}
    </>
  );
};

export default SimpleModel;
