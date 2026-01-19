import * as React from "react";

import { cva } from "class-variance-authority";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";

import { cn } from "../../lib/utils";

const cardVariants = cva("absolute will-change-transform", {
  variants: {
    variant: {
      dark: "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border border-stone-700/50 bg-accent-foreground/80 p-6 backdrop-blur-md",
      light:
        "flex size-full flex-col items-center justify-center gap-6 rounded-2xl border bg-accent bg-background/80 p-6 backdrop-blur-md",
    },
  },
  defaultVariants: {
    variant: "light",
  },
});

const ContainerScrollContext = React.createContext(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (context === undefined) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScrollContextProvider"
    );
  }
  return context;
}

export const ContainerScroll = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-svh w-full", className)}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = "ContainerScroll";

export const CardsContainer = ({ children, className, ...props }) => {
  const containerRef = React.useRef(null);

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ perspective: "1200px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
};
CardsContainer.displayName = "CardsContainer";

export const CardTransformed = React.forwardRef(
  (
    {
      arrayLength,
      index,
      incrementY = 10,  // Reduced for tighter vertical stack
      incrementZ = 20,
      incrementRotation = 2, // Subtle rotation
      className,
      variant,
      style,
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext();

    const cardProgress = 1 / arrayLength;
    const cardStart = (index - 1) * cardProgress;
    const cardReveal = cardStart + cardProgress * 0.4;
    const cardEnd = index * cardProgress;

    // Correct Stacking Logic:
    // Card 1 (Front) -> Offset 0
    // Card 2 (Behind) -> Offset 1
    // ...
    const stackOffset = index - 1; // 0, 1, 2...

    // Initial Stack Positions (Start state)
    const initialY = stackOffset * incrementY;          // Cards stack downwards
    const initialZ = stackOffset * -incrementZ;         // Cards stack backwards in depth
    const initialScale = 1 - stackPositionToScale(stackOffset);
    const initialRotate = stackOffset % 2 === 0 ? stackOffset * incrementRotation : stackOffset * -incrementRotation; // Alternating subtle rotation

    const isLastCard = index === arrayLength;

    // Y Position: Starts at stack offset -> Moves to Center -> Slides Up
    const y = useTransform(
      scrollYProgress,
      [0, cardStart, cardReveal, cardEnd],
      [
        initialY,      // Scroll 0: In Stack
        initialY,      // Start of this card's phase: Still in Stack
        0,             // Reveal: Move to exact center
        isLastCard ? 0 : -150 // End: Slide up and away
      ]
    );

    // Z Position: Starts deep -> Moves to 0 (Front)
    const z = useTransform(
      scrollYProgress,
      [0, cardStart, cardReveal],
      [initialZ, initialZ, 0]
    );

    // Scale: Starts small -> Scales to 1
    const scale = useTransform(
      scrollYProgress,
      [0, cardStart, cardReveal],
      [initialScale, initialScale, 1]
    );

    // Rotation: Starts rotated -> Straightens out
    const rotate = useTransform(
      scrollYProgress,
      [0, cardStart, cardReveal],
      [initialRotate, initialRotate, 0]
    );

    // Opacity: Always visible, fades out only at very end
    const opacity = useTransform(
      scrollYProgress,
      [0, cardReveal, cardEnd],
      [
        1,  // Visible start
        1,  // Visible center
        isLastCard ? 1 : 0 // Fade out end
      ]
    );

    const transform = useMotionTemplate`translate(-50%, -50%) translateY(${y}px) translateZ(${z}px) rotate(${rotate}deg) scale(${scale})`;

    // Shadow dynamic
    const shadowOpacity = useTransform(scrollYProgress, [cardStart, cardReveal], [0.1, 0.3]);
    const filter = useMotionTemplate`drop-shadow(0px 10px 20px rgba(0,0,0,${shadowOpacity}))`;

    const cardStyle = {
      top: "50%",
      left: "50%",
      transform,
      opacity,
      backfaceVisibility: "hidden",
      // Z-index ensures correct layering: Card 1 is top (arrayLength), Last card is bottom (1)
      zIndex: arrayLength - index,
      filter,
      ...style,
    };

    return (
      <motion.div
        ref={ref}
        style={cardStyle}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    );
  }
);
CardTransformed.displayName = "CardTransformed";

function stackPositionToScale(offset) {
  return offset * 0.05; // 0, 0.05, 0.10...
}

export const ReviewStars = React.forwardRef(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const filledStars = Math.floor(rating);
    const fractionalPart = rating - filledStars;
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0);

    return (
      <div
        className={cn("flex items-center gap-2", className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center">
          {[...Array(filledStars)].map((_, index) => (
            <svg
              key={`filled-${index}`}
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
          {fractionalPart > 0 && (
            <svg
              className="size-4 text-inherit"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <defs>
                <linearGradient id="half">
                  <stop
                    offset={`${fractionalPart * 100}%`}
                    stopColor="currentColor"
                  />
                  <stop
                    offset={`${fractionalPart * 100}%`}
                    stopColor="rgb(209 213 219)"
                  />
                </linearGradient>
              </defs>
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z"
                fill="url(#half)"
              />
            </svg>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <svg
              key={`empty-${index}`}
              className="size-4 text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
            </svg>
          ))}
        </div>
        <p className="sr-only">{rating}</p>
      </div>
    );
  }
);
ReviewStars.displayName = "ReviewStars";
