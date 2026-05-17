// app/page.tsx

import Nav from "./Components/Nav";
import WeSection from "./Components/WeSection";
import { RevealLinks } from "./Components/SocialsLinks";
import WhyUs from "./Components/WhyUs";
import Hero from "./Components/Hero";
import Expertise from "./Components/Expertise";
import Works from "./Components/Works";
import Footer from "./Components/Footer";

// ✅ This forces static generation
export const dynamic = "force-static";
export const revalidate = false;

export default async function Home() {
  return (
    <div>
      <Nav bgColor="" />
      <Hero />
      {/* Transparent runway: Hero is fixed + z-behind; without in-flow height here,
          the next section's opaque bg covers the viewport and hides the hero. */}
      <div
        className="pointer-events-none w-screen md:h-20 shrink-0 bg-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none w-screen md:h-80 shrink-0 bg-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none w-screen h-screen shrink-0 bg-transparent"
        aria-hidden
      />
      <WeSection />
      <Works />
      <Expertise />
      <WhyUs />
      <RevealLinks />
      <Footer
        bgColorBottom="#141647"
        bgColorMid="#06060f"
        bgColorTop="#050505"
      />
    </div>
  );
}
