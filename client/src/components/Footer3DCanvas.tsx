import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Footer3DCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Lights for Zari Gilded Shimmer
    const ambientLight = new THREE.AmbientLight(0x2d2215, 2.5);
    scene.add(ambientLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 4.5, 60);
    goldPointLight.position.set(0, 5, 8);
    scene.add(goldPointLight);

    const champagneLight = new THREE.PointLight(0xc5a880, 3, 50);
    champagneLight.position.set(-10, -5, 5);
    scene.add(champagneLight);

    // 1. Undulating Golden Zari Silk Threads (Wavy Parametric Grid)
    const ribbonWidth = 28;
    const ribbonHeight = 12;
    const segmentsX = 75;
    const segmentsY = 40;
    const ribbonGeometry = new THREE.PlaneGeometry(ribbonWidth, ribbonHeight, segmentsX, segmentsY);
    const initialPositions = new Float32Array(ribbonGeometry.attributes.position.array);

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.9,
      roughness: 0.22,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });

    const ribbonMesh = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    ribbonMesh.rotation.x = -Math.PI / 3.2;
    ribbonMesh.position.set(0, -1, -2);
    scene.add(ribbonMesh);

    // 2. Floating Golden Mukaish / Zari Stardust Dust
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 32;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      particleSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Radial Gradient Stardust Texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 245, 200, 1)');
      gradient.addColorStop(0.35, 'rgba(212, 175, 55, 0.7)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.28,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Parallax mouse tracker
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = -(y / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Fluid parallax
      targetX += (mouseX * 1.2 - targetX) * 0.05;
      targetY += (mouseY * 0.8 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // 1. Undulate 3D Zari Silk Grid
      const pos = ribbonGeometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = initialPositions[i * 3];
        const v = initialPositions[i * 3 + 1];
        const wave = Math.sin(u * 0.3 + elapsed * 1.1) * 0.7 + Math.cos(v * 0.4 + elapsed * 0.8) * 0.5;
        pos.setZ(i, initialPositions[i * 3 + 2] + wave);
      }
      pos.needsUpdate = true;
      ribbonGeometry.computeVertexNormals();

      // 2. Float Stardust Upwards
      const pPos = particleGeometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = pPos.getY(i) + particleSpeeds[i] * 0.012;
        if (y > 9) y = -9;
        pPos.setY(i, y);

        const x = pPos.getX(i) + Math.sin(elapsed * 0.5 + i) * 0.005;
        pPos.setX(i, x);
      }
      pPos.needsUpdate = true;

      // 3. Move Shimmer Light
      goldPointLight.position.x = Math.sin(elapsed * 0.7) * 12;
      goldPointLight.position.y = Math.cos(elapsed * 0.5) * 4;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      ribbonGeometry.dispose();
      ribbonMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    />
  );
};
