import { extend } from '@react-three/fiber';
import React, { useMemo, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import * as THREE from 'three';
import { useControls } from 'leva';

// Import shaders
import { NighttimeShader } from '../nightTimeShader'; // Adjust this path as necessary
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader';

extend({ EffectComposer, RenderPass, ShaderPass });

const NightTimeProcessing = ({ nighttimeIntensity = 0.5, fogNear = 50.0, fogFar = 100.0, fogColor = new THREE.Vector3(0.8, 0.1, 0.9) }) => {
    const { gl, scene, camera, size } = useThree();
    
    // Leva controls
    const { intensity, near, far, s } = useControls("NightShader",{
        intensity: { value: nighttimeIntensity, min: 0, max: 1, step: 0.01 },
        near: { value: fogNear, min: 0, max: 100, step: 0.1 },
        far: { value: fogFar, min: 0, max: 200, step: 0.11 },
        s: '#8a165f' // Using a color picker
      });
      const renderPass = new RenderPass(scene, camera);
    renderPass.renderToScreen = true;
      // Convert hex color to Vector3 for THREE
    const fogColorVector = useMemo(() => {
        const color = new THREE.Color(s);
        return new THREE.Vector3(color.r, color.g, color.b);
      }, [s]);

        // Setup the composer
      const composer = useMemo(() => {
      const effectComposer = new EffectComposer(gl);
      effectComposer.addPass(renderPass);
      
      const nighttimePass = new ShaderPass(NighttimeShader);
      // Initially set the uniform values
      nighttimePass.uniforms.amount.value = nighttimeIntensity;
      effectComposer.addPass(nighttimePass);
  
      const colorCorrectionPass = new ShaderPass(ColorCorrectionShader);
      // Initially set the uniform values
      colorCorrectionPass.uniforms['powRGB'].value = new THREE.Vector3(0.8, 0.8, 0.8);
      colorCorrectionPass.uniforms['mulRGB'].value = new THREE.Vector3(1.3, 1.3, 1.3);
      
      effectComposer.addPass(colorCorrectionPass);
  
      return effectComposer;
    }, [gl, scene, camera]);
  
    // Use useEffect to react to prop changes and update shader uniforms
    useEffect(() => {
      // Assuming composer.passes[1] is your nighttimePass
      if (composer.passes[1]) {
        composer.passes[1].uniforms['amount'].value = intensity;
        composer.passes[1].uniforms['fogNear'].value = near;
        composer.passes[1].uniforms['fogFar'].value = far;
        composer.passes[1].uniforms['fogColor'].value = fogColorVector.toArray();
      }
      // Assuming composer.passes[2] is your colorCorrectionPass
      if (composer.passes[2]) {
        
        
      }
    }, [intensity, near, far, fogColorVector, composer]);
  
    // Adjust the composer size when the canvas size changes
    useEffect(() => composer.setSize(size.width, size.height), [size, composer]);
  
    // Render the effect composer in the useFrame loop
    useFrame(() => composer.render(), 1);
  
    return null;
};
  
export default NightTimeProcessing;
