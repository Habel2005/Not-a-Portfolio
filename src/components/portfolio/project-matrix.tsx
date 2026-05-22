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
    camera.position.z = 1200;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const textureLoader = new THREE.TextureLoader();
    const shards: THREE.Mesh[] = [];

    // Use a vertical portrait shard geometry
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
      
      // Spatial distribution in a "hanging" cluster
      const angle = (i / PlaceHolderImages.length) * Math.PI * 2;
      const radius = 600 + Math.random() * 300;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 600,
        (Math.random() - 0.5) * 1000
      );
      
      mesh.lookAt(0, 0, 0);
      mesh.userData = { id: img.id };
      
      group.add(mesh);
      shards.push(mesh);

      // Entrance reveal
      gsap.to(material, {
        opacity: 0.8,
        duration: 2,
        delay: i * 0.2,
        ease: "power2.out"
      });
    });

    // Inertia & Physics Variables
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();
    const currentRotation = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let isMouseDown = false;

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Update targeted heavy rotation
      targetRotation.x = mouse.y * 0.3;
      targetRotation.y = mouse.x * 0.3;
    };

    const onMouseDown = () => {
      isMouseDown = true;
      gsap.to(group.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 0.8, ease: "expo.out" });
    };

    const onMouseUp = () => {
      isMouseDown = false;
      gsap.to(group.scale, { x: 1, y: 1, z: 1, duration: 1.2, ease: "elastic.out(1, 0.3)" });
    };

    const onClick = () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      if (intersects.length > 0) {
        const id = intersects[0].object.userData.id;
        // Cinematic zoom transition
        gsap.to(camera.position, {
          z: intersects[0].object.position.z + 200,
          x: intersects[0].object.position.x,
          y: intersects[0].object.position.y,
          duration: 1.5,
          ease: "expo.inOut",
          onComplete: () => router.push(`/projects/${id}`),
        });
        
        // Blur others
        shards.forEach(s => {
          if (s !== intersects[0].object) {
            gsap.to((s.material as THREE.MeshBasicMaterial), { opacity: 0, duration: 0.5 });
          }
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("click", onClick);

    const animate = () => {
      requestAnimationFrame(animate);
      
      // Dampened "weighted" movement
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;
      
      group.rotation.x = currentRotation.x;
      group.rotation.y = currentRotation.y;

      // Hanging floating motion
      shards.forEach((shard, i) => {
        const time = Date.now() * 0.001;
        shard.position.y += Math.sin(time + i) * 0.2;
        shard.rotation.z = Math.sin(time * 0.5 + i) * 0.05;
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
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return <div ref={containerRef} className="w-full h-full cursor-none" />;
}