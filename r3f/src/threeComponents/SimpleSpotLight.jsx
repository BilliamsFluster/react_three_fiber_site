import React, { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { SpotLight, Object3D, Color } from 'three';
import gsap from 'gsap';

const SimpleSpotLightWithTarget = ({
  initialPosition = [0, 0, 0],
  initialTargetPosition = [0, 0, 0],
  intensity = 1,
  color = '#ffffff',
  angle = Math.PI / 4,
  penumbra = 0,
  canBlink = false
}) => {
  const { scene } = useThree();
  const spotlightRef = useRef();

  useEffect(() => {
    // Create the spotlight with provided properties
    const spotlight = new SpotLight(new Color(color), intensity);
    spotlight.position.set(...initialPosition);
    spotlight.angle = angle;
    spotlight.penumbra = penumbra;
    spotlight.decay = 1.4;
    spotlight.distance = 35;
    spotlight.castShadow = true;
    spotlight.shadow.bias = -0.001;
    spotlight.shadow.mapSize.set(1024, 1024);
    spotlightRef.current = spotlight;

    // Create the target object and position it
    const target = new Object3D();
    target.position.set(...initialTargetPosition);
    scene.add(target);

    // Link the spotlight to its target
    spotlight.target = target;

    // Add the spotlight to the scene
    scene.add(spotlight);

    // Initiate blinking effect
    const blink = () => {
      gsap.to(spotlight, {
        intensity: Math.random() * intensity,
        duration: 0.1 + Math.random() * 0.2, // Random duration for more natural effect
        onComplete: blink, // Call blink again to continue effect indefinitely
        delay: Math.random() * 0.8, // Random delay for irregular blinking
      });
    };
    if(canBlink)
      blink(); // Start blinking

    // Cleanup function to remove the spotlight and its target from the scene and stop the animation
    return () => {
      scene.remove(spotlight);
      scene.remove(target);
      gsap.killTweensOf(spotlight);
    };
  }, [scene, initialPosition, initialTargetPosition, intensity, color, angle, penumbra, canBlink]);

  return null; // This component does not render anything to the DOM itself
};

export default SimpleSpotLightWithTarget;