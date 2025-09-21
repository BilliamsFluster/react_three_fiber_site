import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useGLTF, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { useDisplay } from './DisplayContextManager';

const SimpleTextModel = ({
  model,
  enableTransform = false,
  canShowComponent = true,
  canHover = true,
  componentToShow,
  focusOptions = {},
  ...props
}) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const [mode, setMode] = useState('translate');
  const { scene } = useGLTF(model);
  const { camera, gl } = useThree();
  const { showComponent } = useDisplay();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'w':
          setMode('translate');
          break;
        case 'e':
          setMode('rotate');
          break;
        case 'r':
          setMode('scale');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useGLTF.preload(model);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.metalness = 0.5;
        child.material.roughness = 0.5;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene]);

  if (canHover) {
    useEffect(() => {
      if (!groupRef.current) return;

      groupRef.current.scale.set(1, 1, 1);
      const canvas = document.querySelector('canvas');

      const scaleUp = () => {
        gsap.to(groupRef.current.scale, { duration: 0.3, x: 1.1, y: 1.1, z: 1.1 });
        if (canvas) canvas.style.cursor = 'pointer';
      };

      const scaleDown = () => {
        gsap.to(groupRef.current.scale, { duration: 0.3, x: 1, y: 1, z: 1 });
        if (canvas) canvas.style.cursor = '';
      };

      const object = groupRef.current;
      object.onPointerOver = scaleUp;
      object.onPointerOut = scaleDown;

      return () => {
        object.onPointerOver = null;
        object.onPointerOut = null;
        if (canvas) canvas.style.cursor = '';
      };
    }, []);
  }

  const handleTransformChange = useCallback(() => {
    if (!groupRef.current) return;
    console.log('New Position:', groupRef.current.position);
    console.log('New rotation:', groupRef.current.rotation);
    console.log('New scale:', groupRef.current.scale);
  }, []);

  const handleClick = () => {
    if (!canShowComponent || !groupRef.current) return;

    const focusData = (() => {
      if (focusOptions && focusOptions.position) {
        const { position = [0, 0, 0], target = position, duration, easing } = focusOptions;
        return {
          position: [...position],
          target: [...target],
          duration,
          easing,
        };
      }

      const boundingBox = new THREE.Box3().setFromObject(groupRef.current);
      const center = boundingBox.getCenter(new THREE.Vector3());
      const size = boundingBox.getSize(new THREE.Vector3());
      const direction = camera.position.clone().sub(center).normalize();
      const distance = Math.max(size.length() * 1.5, focusOptions?.distance ?? 6);
      const targetPosition = center.clone().add(direction.multiplyScalar(distance));

      return {
        position: targetPosition.toArray(),
        target: center.toArray(),
        duration: focusOptions?.duration,
        easing: focusOptions?.easing,
      };
    })();

    showComponent(componentToShow, { focus: focusData });
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
              e.stopPropagation();
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
            e.stopPropagation();
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
