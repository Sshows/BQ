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
import ProcessSection from "@/components/sections/ProcessSection";
import ProofSection from "@/components/sections/ProofSection";
import WhyBQ from "@/components/sections/WhyBQ";
import { BQFILMS_CHANNEL_URL } from "@/lib/bqfilms";
import {
  BQ_MEDIA_INSTAGRAM,
  BQ_PRODUCTION_INSTAGRAM,
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WHATSAPP_URL,
} from "@/lib/site";

const homeSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE_DISPLAY,
      sameAs: [
        WHATSAPP_URL,
        BQ_MEDIA_INSTAGRAM.href,
        BQ_PRODUCTION_INSTAGRAM.href,
        BQFILMS_CHANNEL_URL,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      telephone: CONTACT_PHONE_DISPLAY,
      email: CONTACT_EMAIL,
      description: SITE_DESCRIPTION,
      areaServed: "KZ",
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: CONTACT_PHONE_HREF.replace("tel:", ""),
          contactType: "customer service",
          availableLanguage: ["ru"],
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
        />
        <Hero />
        <About />
        <Directions />
        <Cases />
        <ProofSection />
        <ProcessSection />
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
