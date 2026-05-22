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

    // Initialize dimensions
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Core Setup
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

    const textureLoader = new THREE.TextureLoader();
    const shards: THREE.Mesh[] = [];

    // Cinematic Fragment Geometry (Portrait Layout)
    const shardGeom = new THREE.PlaneGeometry(320, 480);

    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      const material = new THREE.MeshBasicMaterial({ 
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      
      // Arc Distribution (Gallery Wall)
      const angle = (i / PlaceHolderImages.length) * Math.PI - Math.PI/2;
      const radius = 800;
      
      mesh.position.set(
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 400,
        Math.cos(angle) * radius - 400
      );
      
      // Face the camera's original plane (not necessarily looking at center to avoid 90-degree slant)
      mesh.rotation.y = angle * 0.5;
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);

      // Entrance Reveal
      gsap.to(material, {
        opacity: 1,
        duration: 2,
        delay: i * 0.15,
        ease: "expo.out"
      });
    });

    // Physics & Interaction
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      targetRotation.x = mouse.y * 0.2;
      targetRotation.y = mouse.x * 0.2;
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      
      if (intersects.length > 0) {
        const clickedShard = intersects[0].object as THREE.Mesh;
        const id = clickedShard.userData.id;

        // Sequence: Zoom -> Fade -> Navigate
        const tl = gsap.timeline({
          onComplete: () => router.push(`/projects/${id}`)
        });

        tl.to(camera.position, {
          x: clickedShard.position.x,
          y: clickedShard.position.y,
          z: clickedShard.position.z + 200,
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
      gsap.to(group.scale, { x: 0.95, y: 0.95, z: 0.95, duration: 0.6, ease: "power2.out" });
    };

    const onMouseUp = () => {
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" });
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClick);

    const animate = () => {
      const frameId = requestAnimationFrame(animate);
      
      // Smooth Weighted Momentum
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      
      group.rotation.x = currentRotation.x;
      group.rotation.y = currentRotation.y;

      // Subtle Hover/Float
      shards.forEach((shard, i) => {
        const time = Date.now() * 0.001;
        shard.position.y += Math.sin(time + i) * 0.15;
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
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return <div ref={containerRef} className="w-full h-full cursor-none bg-transparent" />;
}
