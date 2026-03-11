import {
  AboutSection,
  //AchievementsSection, hide for now
  //BlogSection, hide for now
  // CertificationsSection, // temporarily hidden
  ContactSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  // ServicesSection, // temporarily hidden
  SkillsSection,
  // TestimonialsSection, // temporarily hidden
} from "@/components/sections";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      <SkillsSection />
      {/* <TestimonialsSection /> */}
      {/* <AchievementsSection />  */}
      {/* <BlogSection /> */}
      <ContactSection />
    </>
  );
}

export default PortfolioContent;
