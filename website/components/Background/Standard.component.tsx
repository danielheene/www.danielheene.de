import {
  Camera,
  Color,
  Geometry,
  Mesh,
  Program,
  Renderer,
} from 'ogl-typescript';
import { useEffect, useRef, useState } from 'react';
import TailwindCSS from '../../tailwind.config';
import { vertex, fragment } from './shaders';

export function Standard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
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
      vertex,
      fragment,
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

  return <div className='fixed inset-0 z-[-10]' ref={containerRef} />;
}
