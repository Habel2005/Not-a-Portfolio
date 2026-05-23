
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

export function ProjectMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    group: THREE.Group;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    camera.position.z = 1200;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    sceneRef.current = { renderer, scene, camera, group };

    const textureLoader = new THREE.TextureLoader();
    const shards: THREE.Mesh[] = [];

    // Larger Editorial Card Geometry
    const shardGeom = new THREE.PlaneGeometry(400, 600);

    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      
      // Much wider arc and deeper radius for "spread" feel
      const spread = Math.PI * 0.7; 
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);
      const radius = 1300;
      
      mesh.position.set(
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 150, // More vertical variance
        Math.cos(angle) * radius - 1300
      );
      
      // Face the camera but with a slight organic tilt
      mesh.rotation.y = -angle;
      mesh.rotation.x = (Math.random() - 0.5) * 0.1;
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);

      gsap.to(material, {
        opacity: 1,
        duration: 2.5,
        delay: i * 0.1,
        ease: "expo.out"
      });
    });

    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Heavy magnetic inertia
      targetRotation.x = mouse.y * 0.2;
      targetRotation.y = mouse.x * 0.25;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      
      if (intersects.length > 0) {
        const clickedShard = intersects[0].object as THREE.Mesh;
        const id = clickedShard.userData.id;

        const tl = gsap.timeline({
          onComplete: () => {
            router.push(`/projects/${id}`);
          }
        });

        tl.to(camera.position, {
          x: clickedShard.position.x,
          y: clickedShard.position.y,
          z: clickedShard.position.z + 500,
          duration: 1.5,
          ease: "expo.inOut"
        });

        shards.forEach(s => {
          if (s !== clickedShard) {
            gsap.to((s.material as THREE.MeshBasicMaterial), { 
              opacity: 0, 
              duration: 0.8,
              ease: "power2.in" 
            });
          }
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Dampened inertia
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.03;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.03;
      
      group.rotation.x = currentRotation.x;
      group.rotation.y = currentRotation.y;

      // Asynchronous "Hanging" physics
      shards.forEach((shard, i) => {
        const time = Date.now() * 0.001;
        shard.position.y += Math.sin(time + i) * 0.3;
        shard.rotation.z = Math.sin(time * 0.5 + i) * 0.02;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return <div ref={containerRef} className="w-full h-full cursor-none bg-transparent" />;
}
