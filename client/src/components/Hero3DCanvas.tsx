import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import * as THREE from 'three';

interface Hero3DCanvasProps {
  mode: 'light' | 'dark';
}

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = ({ mode }) => {
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
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = mode === 'dark' ? 1.4 : 1.1;
    container.appendChild(renderer.domElement);

    // Dynamic Lighting
    const ambientLight = new THREE.AmbientLight(
      mode === 'dark' ? 0x221a0f : 0x4a3b2c,
      1.5
    );
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xd4af37, 3.2);
    goldKeyLight.position.set(10, 15, 12);
    scene.add(goldKeyLight);

    const softFillLight = new THREE.PointLight(0xc5a880, 2.5, 50);
    softFillLight.position.set(-12, -8, 8);
    scene.add(softFillLight);

    const rimLight = new THREE.PointLight(0xfff5db, 3, 40);
    rimLight.position.set(0, 10, -5);
    scene.add(rimLight);

    // 1. Flowing 3D Golden Silk Cloth (PlaneGeometry with animated wave vertices)
    const silkWidth = 32;
    const silkHeight = 18;
    const silkSegmentsX = 90;
    const silkSegmentsY = 60;
    const silkGeometry = new THREE.PlaneGeometry(
      silkWidth,
      silkHeight,
      silkSegmentsX,
      silkSegmentsY
    );

    // Save initial vertex positions for wave calculations
    const positionAttr = silkGeometry.attributes.position;
    const initialPositions = new Float32Array(positionAttr.array);

    const silkMaterial = new THREE.MeshStandardMaterial({
      color: mode === 'dark' ? 0xd4af37 : 0xb8860b,
      metalness: 0.85,
      roughness: 0.28,
      wireframe: false,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: mode === 'dark' ? 0.38 : 0.24,
    });

    const silkMesh = new THREE.Mesh(silkGeometry, silkMaterial);
    silkMesh.rotation.x = -Math.PI / 4.5;
    silkMesh.rotation.z = -0.15;
    silkMesh.position.set(0, -1, -3);
    scene.add(silkMesh);

    // 2. Secondary Ethereal Organza Ribbon (Torus / Wavy curve)
    const ribbonGeometry = new THREE.TorusGeometry(8, 0.45, 24, 120);
    const ribbonMaterial = new THREE.MeshStandardMaterial({
      color: 0xf3e5ab,
      metalness: 0.9,
      roughness: 0.15,
      transparent: true,
      opacity: mode === 'dark' ? 0.28 : 0.18,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeometry, ribbonMaterial);
    ribbonMesh.rotation.x = 1.1;
    ribbonMesh.rotation.y = 0.4;
    ribbonMesh.position.set(2, 0, -4);
    scene.add(ribbonMesh);

    // 3. Shimmering Golden Mukaish / Zari Stardust (Particles)
    const particleCount = 420;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 16;
      particleSpeeds[i] = 0.2 + Math.random() * 0.8;
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    // Circular particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 248, 220, 1)');
      gradient.addColorStop(0.3, 'rgba(212, 175, 55, 0.8)');
      gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.35,
      map: particleTexture,
      transparent: true,
      opacity: mode === 'dark' ? 0.85 : 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse tracking for parallax
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
    let clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Fluid Camera Parallax
      targetX += (mouseX * 1.8 - targetX) * 0.04;
      targetY += (mouseY * 1.2 - targetY) * 0.04;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, -2);

      // 1. Animate Golden Silk Waves
      const pos = silkGeometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = initialPositions[i * 3];
        const v = initialPositions[i * 3 + 1];

        // Harmonic multi-frequency waves resembling fluid handloom silk drape
        const wave1 = Math.sin(u * 0.35 + elapsedTime * 1.2) * 1.1;
        const wave2 = Math.cos(v * 0.45 + elapsedTime * 0.9) * 0.9;
        const wave3 = Math.sin((u + v) * 0.2 + elapsedTime * 1.6) * 0.6;
        const waveMouse = Math.sin(u * 0.2 + targetX) * 0.4;

        pos.setZ(i, initialPositions[i * 3 + 2] + wave1 + wave2 + wave3 + waveMouse);
      }
      pos.needsUpdate = true;
      silkGeometry.computeVertexNormals();

      // 2. Animate Ribbon Twist
      ribbonMesh.rotation.z = elapsedTime * 0.15;
      ribbonMesh.rotation.y = Math.sin(elapsedTime * 0.25) * 0.35;
      ribbonMesh.position.y = Math.sin(elapsedTime * 0.8) * 0.4;

      // 3. Animate Zari Stardust Dust
      const pPos = particleGeometry.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        let y = pPos.getY(i) - particleSpeeds[i] * 0.015;
        if (y < -12) y = 12;
        pPos.setY(i, y);

        // subtle horizontal drift
        const x = pPos.getX(i) + Math.sin(elapsedTime * 0.5 + i) * 0.006;
        pPos.setX(i, x);
      }
      pPos.needsUpdate = true;

      // Move point light slightly for metallic shine play
      softFillLight.position.x = Math.sin(elapsedTime * 0.6) * 15;
      softFillLight.position.y = Math.cos(elapsedTime * 0.4) * 8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Clean up geometries and materials
      silkGeometry.dispose();
      silkMaterial.dispose();
      ribbonGeometry.dispose();
      ribbonMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [mode]);

  return (
    <Box
      ref={mountRef}
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden',
        mixBlendMode: mode === 'dark' ? 'screen' : 'multiply',
      }}
    />
  );
};
