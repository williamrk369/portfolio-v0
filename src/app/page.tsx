import { SiteHeader } from "@/components/sections/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { Projects } from "@/components/sections/Projects";
import { Capabilities } from "@/components/sections/Capabilities";
import { Approach } from "@/components/sections/Approach";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { SiteFooter } from "@/components/sections/SiteFooter";

export default function Home() {
  return (
    <>
      <span id="top" aria-hidden className="absolute top-0" />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        <Hero />
        <Credibility />
        <Projects />
        <Capabilities />
        <Approach />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
