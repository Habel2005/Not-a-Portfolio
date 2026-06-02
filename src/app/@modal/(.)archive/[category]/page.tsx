import { notFound } from "next/navigation";
import WebArchive from "@/components/archive/WebArchive";
import MobileArchive from "@/components/archive/MobileArchive";
import SystemsArchive from "@/components/archive/SystemsArchive";

export default function ArchiveModal({ params }: { params: { category: string } }) {
  return (
    // MATCHED YOUR PROJECT MODAL: Added overflow-y-auto and removed overflow-hidden
    <div id="modal-scroller" className="fixed inset-0 z-[100] w-full h-full overflow-y-auto bg-black/40 backdrop-blur-md">
      {params.category === "web" ? (
        <WebArchive />
      ) : params.category === "mobile" ? (
        <MobileArchive />
      ) : params.category === "systems" ? (
        <SystemsArchive />
      ) : (
        notFound()
      )}
    </div>
  );
}