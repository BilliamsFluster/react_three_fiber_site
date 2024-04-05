import React, { useRef } from 'react';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { useControls } from 'leva';


const BloomFX = () => {
    
    
    
    
    
  
    return (
      <EffectComposer>
        <Bloom
          intensity={ 1.2} // The strength of the bloom
          luminanceThreshold={ 0} // Minimum luminance value for a pixel to bloom
          luminanceSmoothing={ 0} // Smooths out the edges of the bloom
          height={ 600} // Resolution of the bloom, lower values = better performance
        />
      </EffectComposer>
    );
  };

  export default BloomFX;