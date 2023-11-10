import Footer from "@/app/(marketing)/landing/Footer";
import HeroSection from "@/app/(marketing)/landing/HeroSection";
import ThemeButton from "@/components/theme/ThemeButton";

export default async function LandingPage() {
  return (
    <div>
      <HeroSection themeSwitch={<ThemeButton />} />
      <Footer />
    </div>
  );
}
