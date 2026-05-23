
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
      
      const spread = Math.PI * 1.2; 
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);
      const radius = 1400;
      
      const posX = Math.sin(angle) * radius;
      const posY = (Math.random() - 0.5) * 300;
      const posZ = Math.cos(angle) * radius - 1400;

      mesh.position.set(posX, posY, posZ);
      mesh.rotation.y = -angle;
      
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
        duration: 2,
        delay: i * 0.1,
        ease: "power2.out"
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
        router.push(`/projects/${id}`);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(shards);
      const currentHover = intersects.length > 0 ? (intersects[0].object as THREE.Mesh) : null;

      if (currentHover !== hoveredShard) {
        hoveredShard = currentHover;
      }

      shards.forEach((shard, i) => {
        const isHovered = shard === hoveredShard;
        const mat = shard.material as THREE.MeshBasicMaterial;
        
        const targetPos = shard.userData.origPos.clone();
        const targetRot = shard.userData.origRot.clone();

        if (isHovered) {
          // Independent Movement: Pull forward and face user
          targetPos.z += 600; 
          targetRot.y = 0; 
          targetRot.x = mouse.y * 0.2; // Independent reactive tilt
          targetRot.z = -mouse.x * 0.1;
          
          gsap.to(mat, { opacity: 1, duration: 0.3 });
        } else {
          // Dim others to highlight the selection
          gsap.to(mat, { opacity: hoveredShard ? 0.1 : 1, duration: 0.6 });
        }

        // Smooth independent lerping
        shard.position.lerp(targetPos, 0.08);
        shard.rotation.x = THREE.MathUtils.lerp(shard.rotation.x, targetRot.x, 0.08);
        shard.rotation.y = THREE.MathUtils.lerp(shard.rotation.y, targetRot.y, 0.08);
        shard.rotation.z = THREE.MathUtils.lerp(shard.rotation.z, targetRot.z, 0.08);

        // Ambient hanging physics
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
