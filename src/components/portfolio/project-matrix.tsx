
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
    camera.position.z = 1000;

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

    // Curved Gallery Wall - Shard Geometry
    const shardGeom = new THREE.PlaneGeometry(380, 540);

    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      
      // Arc distribution logic - more centered for better reachability
      const spread = Math.PI * 0.4; 
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);
      const radius = 950;
      
      mesh.position.set(
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 40,
        Math.cos(angle) * radius - 1000
      );
      
      // Face the camera directly
      mesh.rotation.y = -angle;
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);

      gsap.to(material, {
        opacity: 1,
        duration: 2,
        delay: i * 0.05,
        ease: "power2.out"
      });
    });

    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Subtle, weighted tilt
      targetRotation.x = mouse.y * 0.12;
      targetRotation.y = mouse.x * 0.15;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      
      if (intersects.length > 0) {
        const clickedShard = intersects[0].object as THREE.Mesh;
        const id = clickedShard.userData.id;

        // Cinematic zoom into project
        const tl = gsap.timeline({
          onComplete: () => {
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

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Weighted inertia logic
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      
      group.rotation.x = currentRotation.x;
      group.rotation.y = currentRotation.y;

      // Subtle float effect
      shards.forEach((shard, i) => {
        shard.position.y += Math.sin(Date.now() * 0.0008 + i) * 0.1;
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
