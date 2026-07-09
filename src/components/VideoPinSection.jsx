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
  const sectionRef = useRef(null);

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
  }, []);

  // Lazy load video — only play when section is visible
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Start loading and playing when visible
          if (video.preload === "none") {
            video.preload = "auto";
            video.load();
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="vd-pin-section">
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
          preload="none"
          className="size-full object-cover"
        />

        <div className="abs-center md:scale-100 scale-200">
          <img src="/images/circle-text.svg" alt="Scroll to explore" className="spin-circle" />
          <div className="play-btn">
            <img
              src="/images/play.svg"
              alt="Play video"
              className="size-[3vw] ml-[.5vw]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPinSection;
