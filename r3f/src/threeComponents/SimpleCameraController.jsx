import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as THREE from 'three';
import { useDisplay } from './DisplayContextManager';

const isMobileDevice = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

const defaultSmoothingLambda = 3.2;

const computeSmoothingLambda = (duration = 1.2) => {
  const safeDuration = Math.max(duration, 0.15);
  const lambda = Math.log(20) / safeDuration;
  return Number.isFinite(lambda) ? Math.max(lambda, defaultSmoothingLambda) : defaultSmoothingLambda;
};

const CameraController = ({ enableZoom = true }) => {
  const { camera, gl } = useThree();
  const controlsRef = useRef(null);
  const initialFocusRef = useRef(null);
  const targetPositionRef = useRef(new THREE.Vector3());
  const targetTargetRef = useRef(new THREE.Vector3());
  const smoothingRef = useRef({ lambda: defaultSmoothingLambda });
  const isInteractingRef = useRef(false);
  const { focusData } = useDisplay();

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controlsRef.current = controls;

    controls.minDistance = 6.5;
    controls.maxDistance = 28;
    controls.enableZoom = enableZoom;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.42;
    controls.zoomSpeed = 0.7;

    const defaultTarget = new THREE.Vector3(-0.25, 3.5, 0);
    controls.target.copy(defaultTarget);

    const initialPosition = isMobileDevice()
      ? new THREE.Vector3(6.25, 10.6, 19.8)
      : new THREE.Vector3(2.45, 9.4, 14.35);

    camera.position.copy(initialPosition);

    controls.update();

    initialFocusRef.current = {
      position: initialPosition.clone(),
      target: defaultTarget.clone(),
    };

    targetPositionRef.current.copy(initialPosition);
    targetTargetRef.current.copy(defaultTarget);

    const handleInteractionStart = () => {
      isInteractingRef.current = true;
    };

    const handleInteractionEnd = () => {
      isInteractingRef.current = false;
      targetPositionRef.current.copy(camera.position);
      targetTargetRef.current.copy(controls.target);
    };

    controls.addEventListener('start', handleInteractionStart);
    controls.addEventListener('end', handleInteractionEnd);

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
      controls.removeEventListener('start', handleInteractionStart);
      controls.removeEventListener('end', handleInteractionEnd);
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
        }
      : {
          position: initialFocus.position.clone(),
          target: initialFocus.target.clone(),
          duration: 1.2,
        };

    targetPositionRef.current.copy(focus.position);
    targetTargetRef.current.copy(focus.target);
    smoothingRef.current.lambda = computeSmoothingLambda(focus.duration);
    isInteractingRef.current = false;
  }, [focusData]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;

    if (!controls) {
      return;
    }

    if (!isInteractingRef.current) {
      const lambda = smoothingRef.current.lambda;
      const targetPosition = targetPositionRef.current;
      const targetTarget = targetTargetRef.current;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetPosition.x, lambda, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetPosition.y, lambda, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetPosition.z, lambda, delta);

      controls.target.x = THREE.MathUtils.damp(controls.target.x, targetTarget.x, lambda, delta);
      controls.target.y = THREE.MathUtils.damp(controls.target.y, targetTarget.y, lambda, delta);
      controls.target.z = THREE.MathUtils.damp(controls.target.z, targetTarget.z, lambda, delta);
    } else {
      targetPositionRef.current.copy(camera.position);
      targetTargetRef.current.copy(controls.target);
    }

    controls.update();
  });

  return null;
};

export default CameraController;
