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
          end: isTablet ? "+=2000" : "+=3500",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
          refreshPriority: 1, // Ensure this calculates last
        },
      });

      tl.to(".flavor-content-wrapper", {
        x: "-215vw",
        ease: "none",
        force3D: true,
      });

      const titleTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".flavor-section",
          start: "top top",
          end: "bottom 80%",
          scrub: 0.5,
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

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="flavors">
        {flavorlists.map((flavor) => (
          <div
            key={flavor.name}
            className={`relative z-30 ${["DoOrDue", "OfficeOrDue", "ReachFirst", "DishGuru"].includes(flavor.name) ? "lg:w-[50vw] w-[85vw] lg:h-[85vh] md:w-[80vw] md:h-[65vh] h-[450px]" : "lg:w-[50vw] w-[85vw] lg:h-[70vh] md:w-[80vw] md:h-[50vh] h-[400px]"} flex-none ${flavor.rotation}`}
          >
            <img
              src={flavor.name === "DoOrDue" ? "/images/DoOrDue.png" : flavor.name === "OfficeOrDue" ? "/images/OfficeOrDue.png" : flavor.name === "ReachFirst" ? "/images/ReachFirst.png" : "/images/DishGuru.jpg"}
              alt={flavor.name}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full rounded-[35px] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)]"
              style={{ borderRadius: "35px" }}
              loading="eager"
              onLoad={() => ScrollTrigger.refresh()}
            />

            {/* {!["DoOrDue", "OfficeOrDue", "ReachFirst"].includes(flavor.name) && <h1>{flavor.name}</h1>} */}

            <button
              onClick={() => window.open(flavor.link || `/project/${flavor.name.toLowerCase().replace(/\s+/g, "-")}`, "_blank")}
              className="absolute bottom-5 right-5 bg-[#e3a458] text-black font-semibold px-6 py-2 rounded-full text-sm hover:bg-[#d89345] transition-all"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlavorSlider;
