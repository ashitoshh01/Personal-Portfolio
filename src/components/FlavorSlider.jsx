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

      tl.to(".flavor-section", {
        x: "-100vw",
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
            className={`relative z-30 ${["DoOrDue", "OfficeOrDue"].includes(flavor.name) ? "lg:w-[50vw] w-[90vw] lg:h-[85vh] md:w-[80vw] md:h-[65vh] h-[450px]" : "lg:w-[50vw] w-[90vw] lg:h-[70vh] md:w-[80vw] md:h-[50vh] h-[400px]"} flex-none ${flavor.rotation}`}
          >
            {!["DoOrDue", "OfficeOrDue"].includes(flavor.name) && (
              <img
                src={`/Personal-Portfolio/images/${flavor.color}-bg.svg`}
                alt=""
                className="absolute bottom-0 w-full h-auto"
                loading="eager"
              />
            )}

            <img
              src={flavor.name === "DoOrDue" ? "/Personal-Portfolio/images/DoOrDue.png" : flavor.name === "OfficeOrDue" ? "/Personal-Portfolio/images/OfficeOrDue.png" : `/Personal-Portfolio/images/${flavor.color}-drink.webp`}
              alt=""
              className={
                ["DoOrDue", "OfficeOrDue"].includes(flavor.name)
                  ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full rounded-[35px]"
                  : "drinks object-contain"
              }
              style={["DoOrDue", "OfficeOrDue"].includes(flavor.name) ? { borderRadius: "35px" } : {}}
              loading="eager"
              onLoad={() => ScrollTrigger.refresh()}
            />

            {!["DoOrDue", "OfficeOrDue"].includes(flavor.name) && (
              <img
                src={`/Personal-Portfolio/images/${flavor.color}-elements.svg`}
                alt=""
                className="elements w-full h-auto"
                loading="eager"
              />
            )}

            {!["DoOrDue", "OfficeOrDue"].includes(flavor.name) && <h1>{flavor.name}</h1>}

            <button
              onClick={() => window.open(flavor.link || `/project/${flavor.name.toLowerCase().replace(/\s+/g, "-")}`, "_blank")}
              className="absolute bottom-5 right-5 bg-white text-black font-semibold px-6 py-2 rounded-full text-sm hover:bg-opacity-90 transition-all"
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
