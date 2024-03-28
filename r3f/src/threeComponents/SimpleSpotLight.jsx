import React, { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { SpotLight, Object3D, Color } from 'three';

const SimpleSpotLightWithTarget = ({
  initialPosition = [0, 0, 0],
  initialTargetPosition = [0, 0, 0],
  intensity = 1,
  color = '#ffffff',
  angle = Math.PI / 4,
  penumbra = 0,
}) => {
  const { scene } = useThree();

  useEffect(() => {
    // Create the spotlight with provided properties
    const spotlight = new SpotLight(new Color(color), intensity);
    spotlight.position.set(...initialPosition);
    spotlight.angle = angle;
    spotlight.penumbra = penumbra;

    // Create the target object and position it
    const target = new Object3D();
    target.position.set(...initialTargetPosition);
    scene.add(target);

    // Link the spotlight to its target
    spotlight.target = target;

    // Add the spotlight to the scene
    scene.add(spotlight);

    // Cleanup function to remove the spotlight and its target from the scene
    return () => {
      scene.remove(spotlight);
      scene.remove(target);
    };
  }, [scene, initialPosition, initialTargetPosition, intensity, color, angle, penumbra]);

  return null; // This component does not render anything to the DOM itself
};

export default SimpleSpotLightWithTarget;