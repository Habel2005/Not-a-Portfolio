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

    // Curved Gallery Wall (Front-Facing Arc)
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
      
      // Arc Distribution - Spread across a shallow curve in front of the camera
      const spread = Math.PI * 0.5; // 90 degree arc
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);
      const radius = 1000;
      
      mesh.position.set(
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 100, // Minimal vertical stagger for architectural rhythm
        Math.cos(angle) * radius - 1100 // Depth adjustment to keep it in view
      );
      
      // Face the camera directly
      mesh.rotation.y = -angle;
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);

      gsap.to(material, {
        opacity: 1,
        duration: 2.5,
        delay: i * 0.15,
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

      // Heavy inertia weighted rotation
      targetRotation.x = mouse.y * 0.12;
      targetRotation.y = mouse.x * 0.12;
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
          z: clickedShard.position.z + 400,
          duration: 1.2,
          ease: "expo.inOut"
        });

        shards.forEach(s => {
          if (s !== clickedShard) {
            gsap.to((s.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.5 });
          }
        });
      }
    };

    const onMouseDown = () => {
      gsap.to(group.scale, { x: 0.97, y: 0.97, z: 0.97, duration: 0.6, ease: "power3.out" });
    };

    const onMouseUp = () => {
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Liquid physical damping
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.035;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.035;
      
      group.rotation.x = currentRotation.x;
      group.rotation.y = currentRotation.y;

      shards.forEach((shard, i) => {
        // Architectural floating pulse
        shard.position.y += Math.sin(Date.now() * 0.0008 + i) * 0.15;
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
