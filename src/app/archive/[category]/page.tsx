import { notFound } from "next/navigation";
import WebArchive from "@/components/archive/WebArchive";
import MobileArchive from "@/components/archive/MobileArchive";
import SystemsArchive from "@/components/archive/SystemsArchive";

export default function StandaloneArchivePage({ params }: { params: { category: string } }) {
  if (params.category === "web") return <WebArchive />;
  if (params.category === "mobile") return <MobileArchive />;
  if (params.category === "systems") return <SystemsArchive />;

  // If someone types /archive/pizza, throw a 404
  return notFound();
}