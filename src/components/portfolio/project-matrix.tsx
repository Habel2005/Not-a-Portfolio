
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
    shards: THREE.Mesh[];
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

    const textureLoader = new THREE.TextureLoader();
    const shards: THREE.Mesh[] = [];
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
      
      const spread = Math.PI * 0.8; 
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);
      const radius = 1300;
      
      const posX = Math.sin(angle) * radius;
      const posY = (Math.random() - 0.5) * 200;
      const posZ = Math.cos(angle) * radius - 1300;

      mesh.position.set(posX, posY, posZ);
      mesh.rotation.y = -angle;
      
      // Store original state for independent animation
      mesh.userData = { 
        id: img.id,
        origPos: mesh.position.clone(),
        origRot: mesh.rotation.clone(),
        angle: angle
      };
      
      group.add(mesh);
      shards.push(mesh);

      gsap.to(material, {
        opacity: 1,
        duration: 2.5,
        delay: i * 0.1,
        ease: "expo.out"
      });
    });

    sceneRef.current = { renderer, scene, camera, group, shards };

    const mouse = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();
    let hoveredShard: THREE.Mesh | null = null;
    
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onClick = () => {
      if (hoveredShard) {
        const id = hoveredShard.userData.id;
        const tl = gsap.timeline({
          onComplete: () => {
            router.push(`/projects/${id}`);
          }
        });

        tl.to(camera.position, {
          x: hoveredShard.position.x,
          y: hoveredShard.position.y,
          z: hoveredShard.position.z + 500,
          duration: 1.2,
          ease: "expo.inOut"
        });

        shards.forEach(s => {
          if (s !== hoveredShard) {
            gsap.to((s.material as THREE.MeshBasicMaterial), { 
              opacity: 0, 
              duration: 0.5,
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
      
      // Update Hover State
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      const currentHover = intersects.length > 0 ? (intersects[0].object as THREE.Mesh) : null;

      if (currentHover !== hoveredShard) {
        hoveredShard = currentHover;
      }

      shards.forEach((shard, i) => {
        const isHovered = shard === hoveredShard;
        const mat = shard.material as THREE.MeshBasicMaterial;
        
        // Target Position Logic
        const targetPos = shard.userData.origPos.clone();
        const targetRot = shard.userData.origRot.clone();

        if (isHovered) {
          // Move forward and center
          targetPos.z += 300;
          targetRot.y = 0;
          targetRot.x = mouse.y * 0.2; // Independent reactive tilt
          targetRot.z = -mouse.x * 0.1;
          
          gsap.to(mat, { opacity: 1, duration: 0.3 });
        } else {
          // Subtle mouse reactivity even when not hovered
          const distToMouse = Math.abs(mouse.x - (shard.position.x / 1000));
          const influence = Math.max(0, 1 - distToMouse);
          
          targetRot.x += mouse.y * 0.05 * influence;
          targetRot.y += mouse.x * 0.05 * influence;
          
          // If something else is hovered, dim this one
          gsap.to(mat, { opacity: hoveredShard ? 0.3 : 1, duration: 0.5 });
        }

        // Smooth Lerp to Targets
        shard.position.lerp(targetPos, 0.1);
        shard.rotation.x = THREE.MathUtils.lerp(shard.rotation.x, targetRot.x, 0.1);
        shard.rotation.y = THREE.MathUtils.lerp(shard.rotation.y, targetRot.y, 0.1);
        shard.rotation.z = THREE.MathUtils.lerp(shard.rotation.z, targetRot.z, 0.1);

        // Hanging Ambient Physics (Secondary Layer)
        const time = Date.now() * 0.001;
        shard.position.y += Math.sin(time + i) * 0.2;
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
