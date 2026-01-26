"use client";

import React from "react";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-12 h-12">
        {/* Shadow */}
        {/* <div className="absolute top-16 left-0 w-12 h-[2px] bg-[#ffffff] rounded-full animate-shadow-jump" /> */}

        {/* Box */}
        <div className="absolute w-full h-full bg-[#ffffff] rounded-md animate-box-jump" />
      </div>

      <div className="mt-8 text-[#ffffff] text-xl font-medium tracking-wide font-sans">
        Loading
        <span className="dot animate-dot-1 opacity-50">.</span>
        <span className="dot animate-dot-2 opacity-50">.</span>
        <span className="dot animate-dot-3 opacity-50">.</span>
      </div>

      {/* Tailwind keyframe styles */}
      <style>{`
        @keyframes box-jump {
          15% {
            border-bottom-right-radius: 3px;
          }
          25% {
            transform: translateY(9px) rotate(22.5deg);
          }
          50% {
            transform: translateY(18px) scale(1, 0.9) rotate(45deg);
            border-bottom-right-radius: 40px;
          }
          75% {
            transform: translateY(9px) rotate(67.5deg);
          }
          100% {
            transform: translateY(0) rotate(90deg);
          }
        }

        @keyframes shadow-jump {
          0%, 100% {
            transform: scale(1, 1);
          }
          50% {
            transform: scale(1.2, 1);
          }
        }

        @keyframes dot-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .animate-box-jump {
          animation: box-jump 0.5s linear infinite;
        }

        .animate-shadow-jump {
          animation: shadow-jump 0.5s linear infinite;
        }

        .animate-dot-1 {
          animation: dot-glow 1.4s infinite ease-in-out both; 
        }
        .animate-dot-2 {
          animation: dot-glow 1.4s infinite ease-in-out both;
          animation-delay: 0.2s;
        }
        .animate-dot-3 {
          animation: dot-glow 1.4s infinite ease-in-out both;
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
}
