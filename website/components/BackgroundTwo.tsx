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
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform float u_time;

  uniform sampler2D disp;
  uniform sampler2D tex1;
  uniform sampler2D tex2;

  float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,708.233)))
                 * 43758.5453123);
  }

  float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }

  void main() {
    vec2 uv = vUv;
    vec4 _currentImage;

    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec2 pos = vec2(st* u_time);

    float n = noise(pos);

    _currentImage = texture2D(tex1, vec2(
      uv.x * n,
      uv.y
    ));

    gl_FragColor = _currentImage;
  }
`;

export const BackgroundTwo = memo(
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
