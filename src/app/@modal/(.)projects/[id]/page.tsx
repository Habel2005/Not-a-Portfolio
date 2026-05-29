import { notFound } from "next/navigation";
import KoloAppPage from "@/components/projects/KoloAppPage";
import LearnQuestPage from "@/components/projects/LearnQuestPage";
import ZentryProjectPage from "@/components/projects/ZentryProjectPage";
import ZeroStudioPage from "@/components/projects/ZeroStudioPage";

export default function ProjectModal({ params }: { params: { id: string } }) {
  return (
    // The Fixed Overlay Layer
    <div className="fixed inset-0 z-[100] w-full h-full overflow-y-auto bg-black/40 backdrop-blur-md">
      
      {/* The Dynamic Content */}
      {params.id === "kolo" ? (
        <KoloAppPage />
      ) : params.id === "learnquest" ? (
        <LearnQuestPage />
      ) : params.id === "zentry" ? (
        <ZentryProjectPage />
      ) : params.id === "zero" ? (
        <ZeroStudioPage />
      ) : (
        notFound()
      )}

    </div>
  );
}