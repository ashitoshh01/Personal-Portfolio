import { useMediaQuery } from "react-responsive";
import { nutrientLists, techStack } from "../constants";
import { useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import {
  ContainerScroll,
  CardsContainer,
  CardTransformed,
} from "../components/ui/animated-cards-stack";

// Tech stack data is imported from constants

const NutritionSection = () => {
  const isMobile = useMediaQuery({
    query: "(max-width: 768px)",
  });

  const [lists, setLists] = useState(nutrientLists);

  useEffect(() => {
    if (isMobile) {
      setLists(nutrientLists.slice(0, 3));
    } else {
      setLists(nutrientLists);
    }
  }, [isMobile]);

  return (
    <section className="nutrition-section" data-speed="1">
      {/* Client Testimonials - Animated Cards Stack */}
      <ContainerScroll className="h-[140vh]" data-speed="1">
        <div className="sticky left-0 top-0 h-screen w-full flex flex-col">
          {/* Header at top */}
          <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 pt-10">
            <div className="relative inline-block">
              <div className="general-title relative flex flex-col justify-center items-center gap-3">
                <div className="overflow-hidden place-self-start">
                  <h1 className="nutrition-title text-black">Tech Stack</h1>
                </div>
                <div
                  style={{
                    clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
                  }}
                  className="nutrition-text-scroll place-self-start"
                >
                  <div className="bg-yellow-brown pb-5 md:pt-0 pt-3 md:px-5 px-3">
                    <h2 className="text-milk-yellow">Stack</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards and Orbit Layout */}
          <div className="flex-1 flex items-center justify-center px-5">
            <div className="w-full max-w-2xl mx-auto">
              {/* Tech Stack Cards - Now full width */}
              <div className="flex items-center justify-center">
                <CardsContainer className="h-[450px] w-full">
                  {techStack.map((tech, index) => (
                    <CardTransformed
                      key={`tech-${index}`}
                      arrayLength={techStack.length}
                      index={index + 1}
                      variant="light"
                      className="bg-white border-white border-[0.3rem] backdrop-blur-md shadow-lg"
                    >
                      <div className="flex flex-col items-center justify-start space-y-3 text-center h-full px-4 py-5">
                        <h3 className="text-[#523122] text-2xl md:text-3xl font-bold tracking-tight border-b-4 border-[#a26833] pb-4 w-full mb-2">
                          {tech.category}
                        </h3>
                        <ul className="flex-1 flex flex-col items-center justify-center gap-3 w-full">
                          {tech.technologies.map((technology, techIndex) => (
                            <li
                              key={techIndex}
                              className="text-[#523122] text-lg md:text-xl font-bold w-full px-4 py-3 bg-gradient-to-r from-[#f5e6d3] to-[#fdf6ed] rounded-lg border-2 border-[#d4a574] shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 list-none"
                            >
                              {technology}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardTransformed>
                  ))}
                </CardsContainer>
              </div>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
};

export default NutritionSection;
