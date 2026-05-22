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
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Cleanup logic for hard reset
    if (sceneRef.current) {
      sceneRef.current.renderer.dispose();
      containerRef.current.innerHTML = "";
    }

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    camera.position.z = 1000;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = { renderer, scene };

    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const shards: THREE.Mesh[] = [];

    // Redesigned: Gallery Arc instead of a full circle
    // This makes all tiles accessible and visible from the front
    const shardGeom = new THREE.PlaneGeometry(350, 500);

    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      
      // Arc Distribution (Gallery Wall Layout)
      // spread across 120 degrees in front of camera
      const spread = Math.PI * 0.6;
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);
      const radius = 900;
      
      mesh.position.set(
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 200, // Slight vertical stagger
        Math.cos(angle) * radius - 1000
      );
      
      // Shards fan out to face the user
      mesh.rotation.y = -angle * 0.8;
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);

      gsap.to(material, {
        opacity: 1,
        duration: 2,
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

      // Heavy inertia rotation
      targetRotation.x = mouse.y * 0.15;
      targetRotation.y = mouse.x * 0.15;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      
      if (intersects.length > 0) {
        const clickedShard = intersects[0].object as THREE.Mesh;
        const id = clickedShard.userData.id;

        const tl = gsap.timeline({
          onComplete: () => {
            // Force clean state before navigation
            router.push(`/projects/${id}`);
          }
        });

        tl.to(camera.position, {
          x: clickedShard.position.x,
          y: clickedShard.position.y,
          z: clickedShard.position.z + 300,
          duration: 1,
          ease: "expo.inOut"
        });

        shards.forEach(s => {
          if (s !== clickedShard) {
            gsap.to((s.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.4 });
          }
        });
      }
    };

    const onMouseDown = () => {
      gsap.to(group.scale, { x: 0.98, y: 0.98, z: 0.98, duration: 0.4, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(2)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Fluid physics simulation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.04;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.04;
      
      group.rotation.x = currentRotation.x;
      group.rotation.y = currentRotation.y;

      shards.forEach((shard, i) => {
        shard.position.y += Math.sin(Date.now() * 0.001 + i) * 0.1;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = containerRef.current?.clientWidth || window.innerWidth;
      const h = containerRef.current?.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
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
