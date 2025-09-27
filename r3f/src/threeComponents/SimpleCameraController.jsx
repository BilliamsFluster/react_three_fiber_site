import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { useDisplay } from './DisplayContextManager';

const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const CameraController = ({ enableZoom = true }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef(null);
  const initialFocusRef = useRef(null);
  const { focusData } = useDisplay();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;

    controls.minDistance = 6.5;
    controls.maxDistance = 28;
    controls.enableZoom = enableZoom;
    controls.enablePan = false;

    const defaultTarget = new THREE.Vector3(-0.25, 3.5, 0);
    controls.target.copy(defaultTarget);

    if (isMobileDevice()) {
      camera.position.set(8.25, 12.6, 24.8);
    } else {
      camera.position.set(2.45, 9.4, 14.35);
    }

    controls.update();

    initialFocusRef.current = {
      position: camera.position.clone(),
      target: controls.target.clone(),
    };

    const handleKeyDown = (event) => {
      if (event.key === 'l' || event.key === 'L') {
        console.log(
          `Camera Position: x=${camera.position.x.toFixed(2)}, y=${camera.position.y.toFixed(
            2
          )}, z=${camera.position.z.toFixed(2)}`
        );
        console.log(
          `Camera Target: x=${controls.target.x.toFixed(2)}, y=${controls.target.y.toFixed(
            2
          )}, z=${controls.target.z.toFixed(2)}`
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, gl, enableZoom]);

  useEffect(() => {
    const controls = controlsRef.current;
    const initialFocus = initialFocusRef.current;

    if (!controls || !initialFocus) {
      return;
    }

    const focus = focusData
      ? {
          position: new THREE.Vector3(...focusData.position),
          target: new THREE.Vector3(...(focusData.target || focusData.position)),
          duration: focusData.duration ?? 1.2,
          easing: focusData.easing ?? 'power3.out',
        }
      : {
          position: initialFocus.position.clone(),
          target: initialFocus.target.clone(),
          duration: 1.2,
          easing: 'power3.out',
        };

    gsap.to(camera.position, {
      x: focus.position.x,
      y: focus.position.y,
      z: focus.position.z,
      duration: focus.duration,
      ease: focus.easing,
      onUpdate: () => controls.update(),
    });

    gsap.to(controls.target, {
      x: focus.target.x,
      y: focus.target.y,
      z: focus.target.z,
      duration: focus.duration,
      ease: focus.easing,
      onUpdate: () => controls.update(),
    });
  }, [focusData, camera]);

  return null;
};

export default CameraController;
