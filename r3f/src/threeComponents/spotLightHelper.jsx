
import { useThree } from '@react-three/fiber'
import { useRef, useEffect} from 'react'
import { Object3D, SpotLightHelper, Vector3 } from 'three'
import { useControls } from 'leva'

const SpotLightWithTarget = ({
    initialPosition = [0, 0, 0],
    initialTargetPosition = [0, 0, 0],
    color = '#ffffff',
    intensity = 1,
    angle = Math.PI / 4,
    penumbra = 0,
    active = true,
  }) => {
    const lightRef = useRef();
    const helperRef = useRef(); // Use ref to hold the helper instance
    const { scene } = useThree();
  
    // LEVA controls setup
    const { lightColor, lightIntensity, lightAngle, lightPenumbra, position, targetPosition } = useControls("Spotlight", {
      lightColor: { value: color, label: 'Light Color' },
      lightIntensity: { value: intensity, min: 0, max: 50, step: 0.1, label: 'Light Intensity' },
      lightAngle: { value: angle, min: 0, max: Math.PI, step: 0.01, label: 'Light Angle' },
      lightPenumbra: { value: penumbra, min: 0, max: 1, step: 0.01, label: 'Light Penumbra' },
      position: { value: initialPosition, label: 'Position', step: 0.1 },
      targetPosition: { value: initialTargetPosition, label: 'Target Position', step: 0.1 },
    }, [active]);
  
    useEffect(() => {
      // Ensure the spotlight and its target are properly updated
      if (lightRef.current) {
        lightRef.current.position.set(...position);
        lightRef.current.target.position.set(...targetPosition);
        lightRef.current.target.updateMatrixWorld(); // Important if the target's position influences other calculations
    
        // Now handle the helper
        if (helperRef.current) {
          // First, remove the existing helper to clear it out
          scene.remove(helperRef.current);
        }
    
        // Recreate the helper and attach it to the updated spotlight
        helperRef.current = new SpotLightHelper(lightRef.current);
        scene.add(helperRef.current);
    
        // This forces a re-render of the helper, ensuring it matches the spotlight's current state
        helperRef.current.update();
      }
    
      // Cleanup function to remove the helper when the component unmounts or when position changes
      return () => {
        if (helperRef.current) {
          scene.remove(helperRef.current);
        }
      };
    }, [scene, position, targetPosition, lightRef]);
  
    useEffect(() => {
      if (lightRef.current) {
        lightRef.current.target = new Object3D();
        console.log("TargetPosition: ", targetPosition);
        lightRef.current.target.position.set(...targetPosition);
        console.log("Position: ", position);
        scene.add(lightRef.current.target);
        
        // Update the helper explicitly if positions change
        if (helperRef.current) {
          helperRef.current.update();
        }
      }
  
      return () => {
        if (lightRef.current && lightRef.current.target) {
          scene.remove(lightRef.current.target);
        }
      };
    }, [targetPosition, position, scene]);
  
    return (
      <spotLight
        ref={lightRef}
        position={new Vector3(...position)} // Ensure position is spread into Vector3
        color={lightColor}
        intensity={lightIntensity}
        angle={lightAngle}
        penumbra={lightPenumbra}
      />
    );
  };
  export default SpotLightWithTarget;