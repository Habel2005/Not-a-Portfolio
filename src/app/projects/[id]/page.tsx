
"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ProjectRedirect() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // This dynamic route is deprecated in favor of bespoke editorial pages.
    // If a bespoke folder exists (e.g., /projects/zentry), Next.js will use that automatically.
    // This file now serves as a fallback redirect back to home.
    router.replace("/");
  }, [id, router]);

  return (
    <div className="min-h-screen bg-void-black flex items-center justify-center">
      <div className="text-metadata animate-pulse">SYNCHRONIZING_CORE...</div>
    </div>
  );
}
