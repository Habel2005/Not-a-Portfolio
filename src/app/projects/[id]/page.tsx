import { notFound } from "next/navigation";
import KoloAppPage from "@/components/projects/KoloAppPage";
import LearnQuestPage from "@/components/projects/LearnQuestPage";
import ZentryProjectPage from "@/components/projects/ZentryProjectPage";
import ZeroStudioPage from "@/components/projects/ZeroStudioPage";
// Import your Zero and Zentry components here when they are ready

export default function StandaloneProjectPage({ params }: { params: { id: string } }) {
  // Next.js pulls the "id" right out of the URL
  
  if (params.id === "kolo") return <KoloAppPage />;
  if (params.id === "learnquest") return <LearnQuestPage />;
  if (params.id === "zentry") return <ZentryProjectPage />;
  if (params.id === "zero") return <ZeroStudioPage />;

  // If the ID doesn't match your JSON, throw a 404
  return notFound(); 
}