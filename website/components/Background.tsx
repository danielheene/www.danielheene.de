import {
  Camera,
  Color,
  Geometry,
  Mesh,
  Program,
  Renderer,
} from 'ogl-typescript';
import { forwardRef, memo, Ref, useEffect, useRef, useState } from 'react';
import TailwindCSS from '../tailwind.config';
import { mergeRefs } from '@lib/utils';

const vertexShader = `
attribute vec3 position;
attribute vec4 random;

uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;
uniform float uTime;

varying vec4 vRandom;

void main() {
	vRandom = random;

	// Positions are 0->1, so make -1->1
	vec3 pos = position * 2.0 - 1.0;

	// Scale towards camera to be more interesting
	pos.z *= 10.0;

	// modelMatrix is one of the automatically attached uniforms when using the Mesh class
	vec4 mPos = modelMatrix * vec4(pos, 1.0);

	// Add some movement in world space
	float t = uTime * 0.6;
	mPos.x += sin(t * random.z + 6.28 * random.w) * mix(0.1, 1.5, random.x);
	mPos.y += sin(t * random.y + 6.28 * random.x) * mix(0.1, 1.5, random.w);
	mPos.z += sin(t * random.w + 6.28 * random.y) * mix(0.1, 1.5, random.z);

	// Get the model view position so that we can scale the points off into the distance
	vec4 mvPos = viewMatrix * mPos;
	gl_PointSize = 300.0 / length(mvPos.xyz) * (random.x + 0.1);
	gl_Position = projectionMatrix * mvPos;
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uColor;

varying vec4 vRandom;

void main() {
	vec2 uv = gl_PointCoord.xy;

	float circle = smoothstep(0.5, 0.4, length(uv - 0.5)) * 0.8;

	gl_FragColor.rgb = uColor;
	gl_FragColor.a = circle;
}
`;

export const Background = memo(
  forwardRef((props, externalRef: Ref<HTMLDivElement>) => {
    const containerRef = useRef<HTMLDivElement | null>();
    const mergedRefs = mergeRefs([externalRef, containerRef]);
    const [animationId, setAnimationId] = useState<number>(1);

    useEffect(() => {
      const renderer = new Renderer({
        depth: false,
        dpr: 2,
        alpha: true,
      });

      const gl = renderer.gl;

      const camera = new Camera(gl, {
        fov: 15,
      });
      camera.position.z = 15;

      function handleResize() {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.perspective({
          aspect: gl.canvas.width / gl.canvas.height,
        });
      }

      if (containerRef.current.children.length === 0) {
        try {
          containerRef.current.appendChild(gl.canvas);
          gl.clearColor(0, 0, 0, 1);
          window.addEventListener('resize', handleResize, false);
          handleResize();
        } catch (error) {}
      }

      const numParticles = 100;
      const position = new Float32Array(numParticles * 3);
      const random = new Float32Array(numParticles * 4);

      for (let i = 0; i < numParticles; i++) {
        position.set([Math.random(), Math.random(), Math.random()], i * 3);
        random.set(
          [Math.random(), Math.random(), Math.random(), Math.random()],
          i * 4
        );
      }

      const geometry = new Geometry(gl, {
        position: {
          size: 3,
          data: position,
        },
        random: {
          size: 4,
          data: random,
        },
      });

      const program = new Program(gl, {
        vertex: vertexShader,
        fragment: fragmentShader,
        uniforms: {
          uTime: {
            value: 0,
          },
          uColor: {
            // @ts-ignore
            value: new Color(TailwindCSS.theme.extend.colors.primary[500]),
          },
        },
        transparent: true,
        depthTest: false,
      });

      const particles = new Mesh(gl, {
        mode: gl.POINTS,
        geometry,
        program,
      });

      function update(t) {
        setAnimationId(requestAnimationFrame(update));

        document.body.classList.remove('bg-black');

        particles.rotation.z += 0.0025;
        program.uniforms.uTime.value = t * 0.00025;

        renderer.render({
          scene: particles,
          camera: camera,
        });
      }

      setAnimationId(requestAnimationFrame(update));

      return () => {
        cancelAnimationFrame(animationId);
      };
    }, [containerRef]);

    return <div className='fixed inset-0 z-[-10]' ref={mergedRefs} />;
  })
);
