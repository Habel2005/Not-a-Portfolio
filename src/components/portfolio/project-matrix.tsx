"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

export function ProjectMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    camera.position.z = 1500;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const shardGeom = new THREE.BoxGeometry(400, 600, 10);
    
    const shards: THREE.Mesh[] = [];

    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0.8,
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      
      // Spatial distribution
      const angle = (i / PlaceHolderImages.length) * Math.PI * 2;
      const radius = 900;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 2000
      );
      
      mesh.lookAt(0, 0, 0);
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);
    });

    // Interaction
    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      gsap.to(group.rotation, {
        y: mouse.x * 0.5,
        x: -mouse.y * 0.2,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        // Cinematic zoom in before nav
        gsap.to(camera.position, {
          z: intersects[0].object.position.z + 100,
          x: intersects[0].object.position.x,
          y: intersects[0].object.position.y,
          duration: 1,
          ease: "expo.inOut",
          onComplete: () => router.push(`/projects/${id}`),
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      
      shards.forEach((shard, i) => {
        shard.position.y += Math.sin(Date.now() * 0.001 + i) * 0.5;
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
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return <div ref={containerRef} className="w-full h-full cursor-crosshair" />;
}