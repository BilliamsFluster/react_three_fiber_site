import { Vector3 } from "three";



export const NighttimeShader = {
    uniforms: {
      "tDiffuse": { value: null },
      "amount":   { value: 0.5 },
      "fogNear":  { value: 50.0 },
      "fogFar":   { value: 100.0 },
      "fogColor": { value: new Vector3(0.8, 0.1, 0.9) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
    `,
    fragmentShader: `
      uniform float amount;
      uniform sampler2D tDiffuse;
      uniform float fogNear;
      uniform float fogFar;
      uniform vec3 fogColor;
      varying vec2 vUv;

      void main() {
        vec4 color = texture2D( tDiffuse, vUv );
        vec3 c = color.rgb * (1.0 - amount);

        // Calculate fog effect based on depth
        float fogDepth = gl_FragCoord.z / gl_FragCoord.w;
        float fogFactor = clamp((fogNear - fogDepth) / (fogFar - fogNear), 0.0, 1.0);

        // Interpolate between the original color and the fog color based on fogFactor
        c = mix(c, fogColor, fogFactor);

        gl_FragColor = vec4(c, color.a);
      }
    `
};