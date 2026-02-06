import { useMediaQuery } from "react-responsive";
import { techStack } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";

const NutritionSection = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  useGSAP(() => {
    // Only run animation if we have cards
    if (!cardsRef.current.length) return;

    const totalCards = techStack.length;
    const scrollHeight = totalCards * 1000; // 1500px scroll per card for extended animation

    // Ensure initial state is set
    cardsRef.current.forEach((card, index) => {
      gsap.set(card, {
        y: 0,
        rotation: index % 2 === 0 ? '-2deg' : '2deg',
        opacity: 1,
        scale: 1 - index * 0.02
      });
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: `+=${scrollHeight}`,
        pin: true,
        scrub: 0,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        refreshPriority: 10,
      }
    });

    cardsRef.current.forEach((card, index) => {
      tl.to(card, {
        y: -window.innerHeight - 100,
        rotation: gsap.utils.random(-20, 20),
        opacity: 0,
        duration: 1,
        ease: "none"
      }, index * 1); // Sequence them
    });

  }, { scope: containerRef }); // Scope to container for safety

  return (
    <section ref={containerRef} className="nutrition-section h-screen w-full relative overflow-hidden bg-[#a1a1a1]">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-5">

        {/* Header - Moved to Left */}
        <div className="absolute top-10 left-10 flex flex-col items-start justify-center gap-3 z-50">
          <h1 className="text-3xl md:text-6xl font-bold text-[#513022] uppercase tracking-tighter">
            Tech Stack
          </h1>
          <div className="bg-[#a26833] px-5 py-2 rotate-[-2deg] border-[0.3rem] border-[#e3d3bc]">
            <h2 className="text-[#e3d3bc] text-xl font-bold uppercase">Stack</h2>
          </div>
        </div>

        {/* Cards Container */}
        <div className="relative w-full max-w-xl h-[450px] flex items-center justify-center mt-20">
          {techStack.map((tech, index) => {
            // Reverse index for z-index (0 is top)
            const zIndex = techStack.length - index;

            return (
              <div
                key={`tech-card-${index}`}
                ref={(el) => (cardsRef.current[index] = el)}
                className="absolute w-full h-full bg-white border-[0.3rem] border-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-5"
                style={{
                  zIndex: zIndex,
                  top: 0,
                  // Initial transform handled by GSAP set, but fallback here
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'}) translateY(${index * 5}px) scale(${1 - index * 0.02})`,
                }}
              >
                <h3 className="text-[#523122] text-2xl md:text-3xl font-bold tracking-tight border-b-4 border-[#a26833] pb-4 w-full text-center">
                  {tech.category}
                </h3>

                <ul className="flex-1 flex flex-col items-center justify-center gap-3 w-full">
                  {tech.technologies.map((technology, techIndex) => (
                    <li
                      key={techIndex}
                      className="text-[#523122] text-lg md:text-xl font-bold w-full px-4 py-3 bg-gradient-to-r from-[#f5e6d3] to-[#fdf6ed] rounded-lg border-2 border-[#d4a574] shadow-md transition-all duration-300 list-none text-center"
                    >
                      {technology}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default NutritionSection;
