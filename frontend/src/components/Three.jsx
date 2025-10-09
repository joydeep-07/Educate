import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Three = () => {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef(null);
  const originalPositionsRef = useRef(null);
  const geometryRef = useRef(null);
  const materialRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup (only once)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 60);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Parameters
    const PARTICLE_COUNT = 2600;
    const SPHERE_RADIUS = 22;
    const REPULSION_RADIUS = 15;
    const REPULSION_STRENGTH = 8;

    // Geometry
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);

    // Fibonacci sphere distribution
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const idx = i * 3;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);

      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.sin(phi) * Math.sin(theta);
      const z = Math.cos(phi);

      // Original positions (sphere)
      positions[idx] = x * SPHERE_RADIUS;
      positions[idx + 1] = y * SPHERE_RADIUS;
      positions[idx + 2] = z * SPHERE_RADIUS;

      // Store original positions
      originalPositions[idx] = positions[idx];
      originalPositions[idx + 1] = positions[idx + 1];
      originalPositions[idx + 2] = positions[idx + 2];
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometryRef.current = geometry;

    // Store references for later use
    originalPositionsRef.current = originalPositions;

    const material = new THREE.PointsMaterial({
      size: 0.55,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      color: 0x333333,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);
    pointsRef.current = points;

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      mousePositionRef.current = { x, y };
    };

    // Mouse leave handler - reset all particles
    const handleMouseLeave = () => {
      mousePositionRef.current = { x: 0, y: 0 };

      const positions = geometry.attributes.position.array;
      const originalPositions = originalPositionsRef.current;

      for (let i = 0; i < positions.length; i++) {
        positions[i] = originalPositions[i];
      }

      geometry.attributes.position.needsUpdate = true;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

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
      // Smooth rotation
      points.rotation.y += 0.0012;
      points.rotation.x += 0.0006;

      // Apply cursor repulsion effect
      const mousePos = mousePositionRef.current;
      if (mousePos.x !== 0 || mousePos.y !== 0) {
        const positions = geometry.attributes.position.array;
        const originalPositions = originalPositionsRef.current;

        // Convert mouse position to 3D world coordinates
        const mouseVector = new THREE.Vector3(mousePos.x, mousePos.y, 0.5);
        mouseVector.unproject(camera);
        const dir = mouseVector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const worldMousePos = camera.position
          .clone()
          .add(dir.multiplyScalar(distance));

        for (let i = 0; i < positions.length; i += 3) {
          const particlePos = new THREE.Vector3(
            positions[i],
            positions[i + 1],
            positions[i + 2]
          );

          const originalParticlePos = new THREE.Vector3(
            originalPositions[i],
            originalPositions[i + 1],
            originalPositions[i + 2]
          );

          // Calculate distance from mouse to particle
          const distanceToMouse = particlePos.distanceTo(worldMousePos);

          if (distanceToMouse < REPULSION_RADIUS) {
            // Calculate repulsion force (stronger when closer)
            const force =
              (1 - distanceToMouse / REPULSION_RADIUS) * REPULSION_STRENGTH;

            // Calculate direction from mouse to particle
            const dirAwayFromMouse = new THREE.Vector3()
              .subVectors(particlePos, worldMousePos)
              .normalize();

            // Apply repulsion
            const targetPos = originalParticlePos
              .clone()
              .add(dirAwayFromMouse.multiplyScalar(force));

            // Smoothly move toward target position
            positions[i] += (targetPos.x - positions[i]) * 0.2;
            positions[i + 1] += (targetPos.y - positions[i + 1]) * 0.2;
            positions[i + 2] += (targetPos.z - positions[i + 2]) * 0.2;
          } else {
            // Smoothly return to original position
            positions[i] += (originalPositions[i] - positions[i]) * 0.1;
            positions[i + 1] +=
              (originalPositions[i + 1] - positions[i + 1]) * 0.1;
            positions[i + 2] +=
              (originalPositions[i + 2] - positions[i + 2]) * 0.1;
          }
        }

        geometry.attributes.position.needsUpdate = true;

        // Change color based on mouse interaction
        const hue = 0.6; // Blue hue
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        material.color.lerp(color, 0.02);
      } else {
        // Gradually return to original color when no mouse interaction
        material.color.lerp(new THREE.Color(0x333333), 0.05);
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
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
        cursor: "pointer",
      }}
      className="three-container"
    />
  );
};

export default Three;
