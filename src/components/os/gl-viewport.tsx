
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export function GLViewport() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    shards: THREE.Group;
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);
    scene.fog = new THREE.FogExp2(0x050505, 0.001);

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const shards = new THREE.Group();
    scene.add(shards);

    // Create persistent project shards
    const textureLoader = new THREE.TextureLoader();
    const shardGeom = new THREE.IcosahedronGeometry(150, 0);
    
    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.9,
        roughness: 0.1,
        emissive: new THREE.Color(0xd2ff00),
        emissiveIntensity: 0.05,
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      const angle = (i / PlaceHolderImages.length) * Math.PI * 2;
      const radius = 800;
      mesh.position.set(
        Math.cos(angle) * radius + (Math.random() - 0.5) * 400,
        Math.sin(angle) * radius + (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 1000
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mesh.userData = { id: img.id, title: img.description };
      shards.add(mesh);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xd2ff00, 2, 2000);
    pointLight.position.set(0, 500, 500);
    scene.add(pointLight);

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    sceneRef.current = { scene, camera, renderer, shards, mouse, raycaster };

    // Interaction logic
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      // Force field effect on camera
      gsap.to(camera.position, {
        x: mouse.x * 200,
        y: mouse.y * 200,
        duration: 2,
        ease: "power2.out",
      });
    };

    const onScroll = (e: WheelEvent) => {
      // Custom zoom hierarchy navigation
      gsap.to(camera.position, {
        z: gsap.utils.clamp(200, 5000, camera.position.z + e.deltaY * 2),
        duration: 1.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("wheel", onScroll);

    const animate = () => {
      const frame = requestAnimationFrame(animate);
      
      shards.children.forEach((shard, i) => {
        shard.rotation.y += 0.005;
        shard.rotation.z += 0.002;
        
        // Float effect
        shard.position.y += Math.sin(Date.now() * 0.001 + i) * 0.2;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("wheel", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 bg-void-black" />;
}
