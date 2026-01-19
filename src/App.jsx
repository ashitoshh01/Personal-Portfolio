import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import Lenis from 'lenis';
import MessageSection from "./sections/MessageSection";
import FlavorSection from "./sections/FlavorSection";
import { useGSAP } from "@gsap/react";
import NutritionSection from "./sections/NutritionSection";
import BenefitSection from "./sections/BenefitSection";
import TestimonialSection from "./sections/TestimonialSection";
import FooterSection from "./sections/FooterSection";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProjectDetails from "./pages/ProjectDetails";
import AllProjects from "./pages/AllProjects";
import { useEffect, useState } from "react";
import { HoloPulse } from "./components/ui/holo-pulse-loader";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Handle auto-scroll from navigation state
  useEffect(() => {
    if (location.state?.scrollTo === "flavor" && window.lenis) {
      // Delay slightly to ensure page load/transition
      const timer = setTimeout(() => {
        const element = document.getElementById("flavor");
        if (element) {
          window.lenis.scrollTo(element, { offset: 0, duration: 1.5 });
          // Clear state so it doesn't happen on reload
          window.history.replaceState({}, document.title);
        }
      }, 500); // Wait for loading screen if any, or just transition
      return () => clearTimeout(timer);
    }
  }, [location, isLoading]);

  // Show loading screen for 2 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    ScrollTrigger.normalizeScroll(true);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    // Make lenis available globally for other components to use
    window.lenis = lenis;

    // Check for immediate scroll if loading is done
    if (!isLoading && location.state?.scrollTo === "flavor") {
      const element = document.getElementById("flavor");
      if (element) lenis.scrollTo(element);
    }

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable GSAP's lag smoothing to prevent stuttering
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]); // Re-run if loading state changes to ensure lenis is ready

  // Fix for first-time load: refresh ScrollTrigger after all content loads
  useEffect(() => {
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', refreshScrollTrigger);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      window.removeEventListener('load', refreshScrollTrigger);
      clearTimeout(timer);
    };
  }, []);

  // Show loading screen while loading
  if (isLoading) {
    return <HoloPulse />;
  }

  return (
    <main>
      <NavBar />
      <div>
        <div>
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/all-projects" element={<AllProjects />} />
        <Route path="/project/:projectId" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
