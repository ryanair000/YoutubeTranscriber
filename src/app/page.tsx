import { VideoHero } from "@/components/VideoHero";
import { Summary } from "@/components/Summary";
import { KeyTakeaways } from "@/components/KeyTakeaways";
import { TopicsCovered } from "@/components/TopicsCovered";
import { Architecture } from "@/components/Architecture";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed]">
      <VideoHero />
      <main className="mx-auto max-w-5xl px-6 pb-24">
        <Summary />
        <KeyTakeaways />
        <TopicsCovered />
        <Architecture />
      </main>
      <Footer />
    </div>
  );
}
