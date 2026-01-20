import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef } from "react";

const VideoPinSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const videoRef = useRef(null);

  useGSAP(() => {
    const timer = setTimeout(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "top top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
          invalidateOnRefresh: true,
          refreshPriority: 1,
        },
      });

      tl.to(".video-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, []); // Removed isMobile dependency as it's no longer used for logic

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Video play failed:", error);
      });
    }
  }, []);

  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: "circle(6% at 50% 50%)",
        }}
        className="size-full video-box"
      >
        <video
          ref={videoRef}
          src="/videos/pin-video.mp4"
          playsInline
          muted
          loop
          autoPlay
          className="size-full object-cover"
        />

        <div className="abs-center md:scale-100 scale-200">
          <img src="/images/circle-text.svg" alt="" className="spin-circle" />
          <div className="play-btn">
            <img
              src="/images/play.svg"
              alt=""
              className="size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
