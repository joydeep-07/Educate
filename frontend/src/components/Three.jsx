// src/components/Three.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Three = () => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 60);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Parameters
    const PARTICLE_COUNT = 2600;
    const SPHERE_RADIUS = 22;

    // Geometry
    const positions = new Float32Array(PARTICLE_COUNT * 3);

    // Fibonacci sphere distribution
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      positions[idx] = x * SPHERE_RADIUS;
      positions[idx + 1] = y * SPHERE_RADIUS;
      positions[idx + 2] = z * SPHERE_RADIUS;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.55,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      color: 0x333333,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Resize
    function onResize() {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    // Animation
    function animate() {
      points.rotation.y += 0.0012; // smooth rotation
      points.rotation.x += 0.0006; // slight tilt
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      geometry.dispose();
      material.dispose();
      if (renderer.domElement?.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.forceContextLoss();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "500px",
        height: "350px",
        overflow: "hidden",
        display: "block",
        position: "relative",
        borderRadius: "12px",
      }}
    />
  );
};

export default Three;
