import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Directions from "@/components/sections/Directions";
import Cases from "@/components/sections/Cases";
import WhyBQ from "@/components/sections/WhyBQ";
import Founder from "@/components/sections/Founder";
import ConsultForm from "@/components/sections/ConsultForm";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Directions />
        <Cases />
        <WhyBQ />
        <Founder />
        <ConsultForm />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
