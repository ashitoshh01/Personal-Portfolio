import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

import { useMediaQuery } from "react-responsive";
import ShaderBackground from "../components/ui/shader-background";

const HeroSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  const introTlRef = useRef(null);
  const hasPlayedOnce = useRef(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      paused: true,
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

    introTlRef.current = tl;

    // Play immediately on first load
    tl.play();
    hasPlayedOnce.current = true;

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

  // Replay intro animation when hero scrolls back into view
  useEffect(() => {
    const heroEl = document.getElementById("hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasPlayedOnce.current && introTlRef.current) {
          // Restart the intro animation from the beginning
          introTlRef.current.restart();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

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
              <span className="block uppercase text-[5.5vw] font-bold text-white leading-none tracking-tighter 2xl:px-[1.2vw] px-2 2xl:pb-[1vw] pb-2 2xl:py-0 py-1.5 whitespace-nowrap">PROBLEM SOLVER + DEVELOPER </span>
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
