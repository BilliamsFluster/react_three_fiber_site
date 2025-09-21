import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Color, DoubleSide, AdditiveBlending } from 'three';

const LocalFogMaterial = shaderMaterial(
  {
    time: 0,
    color: new Color('#1b2a3d'),
    baseHeight: 0,
    heightFalloff: 2.5,
    opacity: 0.45,
    noiseScale: 0.2,
    speed: 0.03,
  },
  `
  varying vec3 vWorldPosition;

  void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`,
  `
  uniform float time;
  uniform vec3 color;
  uniform float baseHeight;
  uniform float heightFalloff;
  uniform float opacity;
  uniform float noiseScale;
  uniform float speed;

  varying vec3 vWorldPosition;

  float hash(vec3 p) {
    p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
             dot(p, vec3(269.5, 183.3, 246.1)),
             dot(p, vec3(113.5, 271.9, 124.6)));
    return fract(sin(p.x + p.y + p.z) * 43758.5453);
  }

  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);

    float n000 = hash(i + vec3(0.0, 0.0, 0.0));
    float n001 = hash(i + vec3(0.0, 0.0, 1.0));
    float n010 = hash(i + vec3(0.0, 1.0, 0.0));
    float n011 = hash(i + vec3(0.0, 1.0, 1.0));
    float n100 = hash(i + vec3(1.0, 0.0, 0.0));
    float n101 = hash(i + vec3(1.0, 0.0, 1.0));
    float n110 = hash(i + vec3(1.0, 1.0, 0.0));
    float n111 = hash(i + vec3(1.0, 1.0, 1.0));

    vec3 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(mix(n000, n100, u.x), mix(n010, n110, u.x), u.y),
               mix(mix(n001, n101, u.x), mix(n011, n111, u.x), u.y), u.z);
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    float height = vWorldPosition.y - baseHeight;
    float heightMask = 1.0 - smoothstep(0.0, heightFalloff, max(height, 0.0));

    vec3 flowSamplePosition = vec3(vWorldPosition.xz * noiseScale, (vWorldPosition.y + time * 5.0) * noiseScale);
    float flow = fbm(flowSamplePosition + vec3(0.0, time * speed * 15.0, time * speed * 5.0));

    float density = heightMask * flow;
    float alpha = clamp(density * opacity, 0.0, 1.0);

    if (alpha <= 0.001) {
      discard;
    }

    gl_FragColor = vec4(color, alpha);
  }
`
);

extend({ LocalFogMaterial });

const LocalFog = ({
  position = [0, 0.5, 0],
  size = [8, 2.5, 8],
  color = '#1b2a3d',
  opacity = 0.5,
  heightFalloff = 2.5,
  noiseScale = 0.25,
  speed = 0.05,
}) => {
  const materialRef = useRef();
  const fogColor = useMemo(() => new Color(color), [color]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.time += delta;
    }
  });

  return (
    <mesh position={position} frustumCulled={false}>
      <boxGeometry args={size} />
      <localFogMaterial
        ref={materialRef}
        color={fogColor}
        baseHeight={position[1] - size[1] / 2}
        heightFalloff={heightFalloff}
        opacity={opacity}
        noiseScale={noiseScale}
        speed={speed}
        transparent
        depthWrite={false}
        side={DoubleSide}
        blending={AdditiveBlending}
      />
    </mesh>
  );
};

export default LocalFog;
