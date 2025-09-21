import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CameraController = ({enableZoom = true}) => {
  const { camera, gl, size } = useThree();
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const controlsRef = useRef(null);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.enableZoom = enableZoom;
    controls.target.set(0, 1.3, 0);
    controls.update();
    controlsRef.current = controls;

    const logCameraPosition = () => {
      const { x, y, z } = camera.position;
      console.log(`Camera Position: x=${x.toFixed(3)}, y=${y.toFixed(3)}, z=${z.toFixed(3)}`);
    };

    const handleKeyDown = (event) => {
      if (event.key === 'c' || event.key === 'C') {
        setControlsEnabled((value) => !value);
      }
      if (event.key === 'l' || event.key === 'L') {
        logCameraPosition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      controls.dispose();
      window.removeEventListener('keydown', handleKeyDown);
      controlsRef.current = null;
    };
  }, [camera, gl, enableZoom]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (controls) {
      controls.enabled = controlsEnabled;
    }
  }, [controlsEnabled]);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) {
      return;
    }

    const isCompactViewport = size.width < 768;

    if (isCompactViewport) {
      camera.position.set(5.4, 7.6, 15.8);
      camera.fov = 42;
      controls.minDistance = 7.5;
      controls.maxDistance = 24;
      controls.target.set(0, 1.6, 0);
    } else {
      camera.position.set(2.2, 6.8, 9.4);
      camera.fov = 38;
      controls.minDistance = 4.5;
      controls.maxDistance = 16;
      controls.target.set(0, 1.3, 0);
    }

    camera.updateProjectionMatrix();
    controls.update();
  }, [camera, size]);

  return null;
};

export default CameraController;
