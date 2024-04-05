import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const CameraController = ({enableZoom = true}) => {
  const { camera, gl } = useThree();
  const [controlsEnabled, setControlsEnabled] = useState(true);

  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 20;
    controls.enableZoom = enableZoom;
    controls.enabled = controlsEnabled; // Use the state to enable/disable
    controls.enablePan = false;

    // Function to log the current camera position
    const logCameraPosition = () => {
      console.log(`Camera Position: x=${camera.position.x}, y=${camera.position.y}, z=${camera.position.z}`);
      
    };

    // Function to set a predefined camera position
    const setCameraPosition = (x, y, z) => {
      camera.position.set(x, y, z);
      controls.update(); 
    };

    const isMobile = () => {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };
    if(isMobile())
    {
      setCameraPosition(5.308,8.143,16.736);
      console.log("IOS");

    }
    else
    {
      setCameraPosition(1.705,8.6,9.381);
      console.log('computer');

    }

    

    // Event listener to toggle control and log position
    const handleKeyDown = (event) => {
      if (event.key === 'c' || event.key === 'C') { // Toggle controls on 'C' key
        setControlsEnabled(!controlsEnabled);
      }
      if (event.key === 'l' || event.key === 'L') { // Log camera position on 'L' key
        logCameraPosition();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      controls.dispose();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [camera, gl, controlsEnabled]); // Re-run effect if controlsEnabled changes

  return null;
};

export default CameraController;
