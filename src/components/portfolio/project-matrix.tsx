
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

export function ProjectMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isNavigating = useRef(false);

  useEffect(() => {
    if (!containerRef.current || containerRef.current.clientWidth === 0) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 5000);
    camera.position.z = 900;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.fog = new THREE.Fog("#050505", 1600, 4200);
    scene.add(mainGroup);

    const textureLoader = new THREE.TextureLoader();
    const shardGeom = new THREE.PlaneGeometry(600, 850);
    const shardGroups: { group: THREE.Group, mesh: THREE.Mesh, origZ: number }[] = [];

    PlaceHolderImages.forEach((img, i) => {
      const texture = textureLoader.load(img.imageUrl);
      
      // --- THE HD IMAGE QUALITY FIX ---
      // 1. Fix the "whitish" washed-out look by enforcing standard web color space
      texture.colorSpace = THREE.SRGBColorSpace; 
      
      // 2. Prevent the browser from creating blurry low-res versions (Mipmaps)
      texture.generateMipmaps = false;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      
      // 3. Keep images razor-sharp when looking at them from an angle
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
      // --------------------------------
      

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        toneMapped: false,
      
        // darker cinematic desaturation
        color: new THREE.Color(0x8f8f8f),
      });

      const mesh = new THREE.Mesh(shardGeom, material);
      const wrapperGroup = new THREE.Group();
      
      // Arc logic
      const radius = 2500;
      const spread = Math.PI * 0.25;
      const angle = (i / (PlaceHolderImages.length - 1)) * spread - (spread / 2);

      const posX = Math.sin(angle) * radius;
      const posY = (Math.random() - 0.5) * 150;
      const posZ = Math.cos(angle) * radius - radius;

      wrapperGroup.position.set(posX, posY, posZ);
      wrapperGroup.rotation.y = -angle;

      mesh.userData = { id: img.id, index: i };

      wrapperGroup.add(mesh);
      mainGroup.add(wrapperGroup);
      shardGroups.push({ group: wrapperGroup, mesh: mesh, origZ: posZ });

      gsap.to(material, {
        opacity: 1,
        duration: 2,
        delay: i * 0.1,
        ease: "power2.out"
      });
    });

    const mouse = new THREE.Vector2(-1000, -1000);
    const raycaster = new THREE.Raycaster();
    let hoveredMesh: THREE.Mesh | null = null;

    const onMouseMove = (e: MouseEvent) => {
      if (isNavigating.current) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const onClick = () => {
      if (hoveredMesh && !isNavigating.current) {
        isNavigating.current = true;
        const id = hoveredMesh.userData.id;

        shardGroups.forEach(({ mesh }) => {
          if (mesh !== hoveredMesh) {
            gsap.to(mesh.material, { opacity: 0, duration: 0.4, ease: "power2.out" });
          }
        });

        scene.attach(hoveredMesh);

        gsap.to(hoveredMesh.position, {
          x: 0,
          y: 0,
          z: 300, 
          duration: 0.8,
          ease: "expo.inOut"
        });

        gsap.to(hoveredMesh.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 0.8,
          ease: "expo.inOut"
        });

        setTimeout(() => {
          router.push(`/projects/${id}`);
        }, 850); 
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);

    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      if (!isNavigating.current) {
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(shardGroups.map(sg => sg.mesh));
        const currentHover = intersects.length > 0 ? (intersects[0].object as THREE.Mesh) : null;

        if (currentHover !== hoveredMesh) {
          if (hoveredMesh) {
            gsap.to(hoveredMesh.position, { z: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            gsap.to(hoveredMesh.rotation, { x: 0, y: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            gsap.to(hoveredMesh.material, { opacity: currentHover ? 0.3 : 1, duration: 0.5, overwrite: "auto" });
          }

          if (currentHover) {
            gsap.to(currentHover.position, { z: 300, duration: 0.5, ease: "power2.out", overwrite: "auto" });
            const parentRotY = currentHover.parent?.rotation.y || 0;
            gsap.to(currentHover.rotation, {
              x: mouse.y * 0.1,
              y: -parentRotY,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto"
            });
            gsap.to(currentHover.material, { opacity: 1, duration: 0.3, overwrite: "auto" });

            shardGroups.forEach(({ mesh }) => {
              if (mesh !== currentHover) gsap.to(mesh.material, { opacity: 0.3, duration: 0.5, overwrite: "auto" });
            });
          }
          hoveredMesh = currentHover;
        } else if (hoveredMesh) {
          gsap.to(hoveredMesh.rotation, {
            x: mouse.y * 0.1,
            y: -(hoveredMesh.parent?.rotation.y || 0) + (mouse.x * 0.1),
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      }

      const time = Date.now() * 0.001;
      shardGroups.forEach(({ group }, i) => {
        group.position.y += Math.sin(time + i) * 0.2;
      });
      renderer.toneMappingExposure = 0.72;

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frameId);
      gsap.killTweensOf(shardGroups.map(sg => sg.mesh.position));
      gsap.killTweensOf(shardGroups.map(sg => sg.mesh.rotation));
      gsap.killTweensOf(shardGroups.map(sg => sg.mesh.material));
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (object.material.map) object.material.map.dispose();
          object.material.dispose();
        }
      });
      shardGeom.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [router]);

  return <div ref={containerRef} className="w-full h-full cursor-none bg-transparent" />;
}
