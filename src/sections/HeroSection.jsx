import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useMediaQuery } from "react-responsive";
import ShaderBackground from "../components/ui/shader-background";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
    });

    tl.fromTo(
      ".hero-content",
      { opacity: 0 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power1.inOut",
      }
    )
      .from(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        ".hero-title",
        {
          yPercent: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.5"
      );

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 7,
      scale: 0.9,
      yPercent: 30,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="hero" className="bg-main-bg">
      <div className="hero-container">
        <ShaderBackground />
        {/* Overlay to improve text readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] pointer-events-none [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
        <div className="hero-content">
          <div className="overflow-hidden">
            <h1 className="hero-title">Ashitosh</h1>
          </div>
          <div className="hero-text-scroll">
            <div className="hero-subtitle">
              <h1>PROBLEM SOLVER + DEVELOPER </h1>
            </div>
          </div>

          <h2>
            I work on building functional and well-structured digital products with a focus on clean design and reliable performance. I’m interested in learning through real projects and improving with every iteration.
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
