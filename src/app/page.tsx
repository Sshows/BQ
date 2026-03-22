import Footer from "@/components/Footer";
import InstagramFeedGallery from "@/components/InstagramFeedGallery";
import Navbar from "@/components/Navbar";
import About from "@/components/sections/About";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";
import ConsultForm from "@/components/sections/ConsultForm";
import Directions from "@/components/sections/Directions";
import Founder from "@/components/sections/Founder";
import Hero from "@/components/sections/Hero";
import ProofSection from "@/components/sections/ProofSection";
import WhyBQ from "@/components/sections/WhyBQ";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Directions />
        <Cases />
        <ProofSection />
        <InstagramFeedGallery />
        <WhyBQ />
        <Founder />
        <ConsultForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
