"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import ScrollReveal from "@/components/ScrollReveal";
import ConstellationCanvas from "@/components/ConstellationCanvas";
import CustomCursor from "@/components/CustomCursor";
import PagePreloader from "@/components/PagePreloader";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <PagePreloader onComplete={() => setIsLoaded(true)} />
      <CustomCursor />
      <ConstellationCanvas />
      <ScrollReveal />
      <Navbar />
      <main className="relative z-10">
        <HeroSection isLoaded={isLoaded} />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
    </>
  );
}
