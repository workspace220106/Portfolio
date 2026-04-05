import { Navbar } from "../components/Navbar";
import { Hero } from "../sections/Hero";
import { About } from "../sections/About";
import { Skills } from "../sections/Skills";
import { Projects } from "../sections/Projects";
import { Experience } from "../sections/Experience";
import { Education } from "../sections/Education";
import { Location } from "../sections/Location";
import { Testimonials } from "../sections/Testimonials";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { PageLoader } from "../components/PageLoader";
import { ParticleField } from "../components/3d/ParticleField";

const DEVELOPER_NAME = "[Your Name]";

export default function HomePage() {
  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ParticleField />
      <div className="noise-overlay" aria-hidden="true" />
      <main className="relative">
        <Navbar />
        <Hero name={DEVELOPER_NAME} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Location />
        <Testimonials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
