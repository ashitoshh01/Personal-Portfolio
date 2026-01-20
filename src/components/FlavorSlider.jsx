import { useGSAP } from "@gsap/react";
import { flavorlists } from "../constants";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

const FlavorSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "2% top",
          end: isTablet ? "+=5500" : "+=3500",
          scrub: 0.3, // Reduced for snappier response
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          preventOverlaps: true,
        },
      });

      tl.to(".flavor-content-wrapper", {
        x: isTablet ? "-235vw" : "-215vw",
        ease: "none",
        force3D: true,
      });

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "top top",
          end: "bottom 80%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
      });

      titleTl
        .to(".first-text-split", {
          xPercent: -30,
          ease: "none",
          force3D: true,
        })
        .to(
          ".flavor-text-scroll",
          {
            xPercent: -22,
            ease: "none",
            force3D: true,
          },
          "<"
        )
        .to(
          ".second-text-split",
          {
            xPercent: -10,
            ease: "none",
            force3D: true,
          },
          "<"
        );

      // Force refresh to ensure pinning works correctly on load
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  });

  const visibleFlavors = [
    ...flavorlists.slice(0, 3),
    {
      name: "See More",
      isSeeMore: true,
      rotation: "rotate-[0deg]",
      link: "/all-projects"
    }
  ];

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {visibleFlavors.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 ${flavor.isSeeMore
              ? "lg:w-[40vw] w-[70vw] lg:h-[70vh] md:w-[60vw] md:h-[50vh] h-[400px]"
              : ["DoOrDue", "OfficeOrDue", "ReachFirst", "DishGuru"].includes(flavor.name)
                ? "lg:w-[50vw] w-[85vw] lg:h-[85vh] md:w-[80vw] md:h-[65vh] h-[450px]"
                : "lg:w-[50vw] w-[85vw] lg:h-[70vh] md:w-[80vw] md:h-[50vh] h-[400px]"
              } flex-none flex items-center justify-center ${flavor.rotation}`}
          >
            {flavor.isSeeMore ? (
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center pointer-events-none"
              >
                <div
                  className="flex flex-col items-center justify-center gap-6 cursor-pointer group pointer-events-auto transition-transform duration-500 hover:scale-110"
                  onClick={() => window.location.href = flavor.link}
                >
                  <span className="text-4xl md:text-6xl font-black text-[#e3a458] tracking-tighter uppercase text-center group-hover:tracking-wide transition-all duration-300">
                    See More<br />Projects
                  </span>

                  <div className="w-20 h-20 rounded-full border-2 border-[#e3a458]/50 flex items-center justify-center text-[#e3a458] group-hover:bg-[#e3a458] group-hover:text-black group-hover:border-[#e3a458] transition-all duration-500 shadow-[0_0_30px_-10px_rgba(227,164,88,0.3)] group-hover:shadow-[0_0_50px_-10px_rgba(227,164,88,0.6)]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 group-hover:translate-x-1 transition-transform duration-300">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative inline-flex justify-center items-center max-w-full max-h-full">
                <img
                  src={flavor.name === "DoOrDue" ? "/images/DoOrDue.png" : flavor.name === "OfficeOrDue" ? "/images/OfficeOrDue.png" : flavor.name === "ReachFirst" ? "/images/ReachFirst.png" : "/images/DishGuru.jpg"}
                  alt={flavor.name}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-[35px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]"
                  style={{ borderRadius: "35px" }}
                  loading="eager"
                  onLoad={() => ScrollTrigger.refresh()}
                />

                <button
                  onClick={() => window.open(flavor.link || `/project/${flavor.name.toLowerCase().replace(/\s+/g, "-")}`, "_blank")}
                  className="absolute -bottom-3.5 right-5 bg-[#e3a458] text-black font-semibold px-6 py-2 rounded-full text-sm hover:bg-[#d89345] transition-all"
                >
                  See Details
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
