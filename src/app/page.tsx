import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BrandStatement } from "@/components/brand-statement";
import { CollectionPreview } from "@/components/collection-preview";
import { Countdown } from "@/components/countdown";
import { EmailSignup } from "@/components/email-signup";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white">
      <div className="bg-noise pointer-events-none fixed inset-0 z-50 opacity-[0.03]" />
      <Navbar />
      <Hero />
      <BrandStatement />
      <CollectionPreview />
      <Countdown />
      <EmailSignup />
      <Footer />
    </main>
  );
}
