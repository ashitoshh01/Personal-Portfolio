import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { flavorlists } from "../constants";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

// Enhanced project data
const enhancedProjects = flavorlists.map((project) => ({
    ...project,
    description: "A transformative digital solution designed to streamline user workflows and enhance engagement through intuitive interfaces and robust architecture. Built with performance and scalability in mind.",
    sourceLink: "https://github.com/ashitoshh01",
}));

const AllProjects = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const navigate = useNavigate();

    // Get current project
    const activeProject = enhancedProjects[activeIndex];

    return (
        <main className="bg-[#f5f5f0] min-h-screen text-[#1a1a1a] overflow-hidden selection:bg-[#e3a458] selection:text-white">
            <NavBar />

            {/* Back Button - Dark style for visibility on light bg */}
            <button
                onClick={() => navigate("/", { state: { scrollTo: "flavor" } })}
                className="fixed top-24 left-4 z-50 md:left-10 flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-stone-200 text-stone-800 font-bold hover:bg-[#e3a458] hover:text-white hover:border-[#e3a458] transition-all duration-300 shadow-xl group"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Back
            </button>

            <div className="w-full h-screen pt-32 pb-6 px-4 md:px-12 flex flex-col md:flex-row gap-8 md:gap-16 items-center">

                {/* LHS: Project Details (Static Container, Dynamic Content) */}
                <div className="w-full md:w-[35%] h-full flex flex-col justify-center relative z-20 pointer-events-none md:pointer-events-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="flex flex-col items-start"
                        >
                            {/* Project Number Tag */}
                            <span className="px-4 py-1 mb-6 rounded-full border border-[#e3a458] text-[#e3a458] text-sm font-bold uppercase tracking-widest bg-[#e3a458]/5">
                                Project 0{activeIndex + 1}
                            </span>

                            {/* Title with Split Reveal effect if desire, plain fade for now */}
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#e3a458] mb-8 leading-[0.9] tracking-tighter uppercase">
                                {activeProject.name.split(' ').map((word, i) => (
                                    <span key={i} className="block">{word}</span>
                                ))}
                            </h1>

                            {/* Description */}
                            <p className="text-lg md:text-xl text-[#1a1a1a]/70 mb-10 font-medium leading-relaxed max-w-md">
                                {activeProject.description}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-4 pointer-events-auto">
                                <button
                                    onClick={() => window.open(activeProject.link, "_blank")}
                                    className="px-8 py-4 bg-[#1a1a1a] text-white rounded-full font-bold hover:bg-[#e3a458] hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
                                >
                                    <span>Live Demo</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => window.open(activeProject.sourceLink, "_blank")}
                                    className="px-8 py-4 bg-white border-2 border-stone-200 text-[#1a1a1a] rounded-full font-bold hover:border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 flex items-center gap-2 shadow-sm"
                                >
                                    <span>Source Code</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36.5-8 3C6.77.5 3.05-.1 1 2.5 1 2.5 1 4.5 3 6c-.28 1.15-.28 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                </button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* RHS: Accordion Gallery (The Visuals) */}
                <div className="w-full md:w-[65%] h-[60vh] md:h-full flex gap-3 md:gap-5 overflow-hidden rounded-[2rem]">
                    {enhancedProjects.map((project, index) => (
                        <ProjectImageCard
                            key={project.name}
                            project={project}
                            isActive={activeIndex === index}
                            onClick={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

// Simplified Card Component for RHS - Only handles Image + Vertical Text
const ProjectImageCard = ({ project, isActive, onClick }) => {
    return (
        <motion.div
            layout
            onClick={onClick}
            className={`relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] bg-[#1a1a1a] ${isActive ? "rounded-[10px] flex-[10]" : "rounded-lg flex-[1] hover:flex-[1.5]"
                }`}
        >
            {/* Image Layer - Only visible when active */}
            <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                <div className="absolute inset-0 bg-black/0" /> {/* No overlay needed when active per request */}

                <img
                    src={project.name === "DoOrDue" ? "/images/DoOrDue.png" :
                        project.name === "OfficeOrDue" ? "/images/OfficeOrDue.png" :
                            project.name === "ReachFirst" ? "/images/ReachFirst.png" :
                                "/images/DishGuru.jpg"}
                    alt={project.name}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Inactive State: Vertical Text on Solid Background */}
            <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-300 ${isActive ? 'opacity-0' : 'opacity-100 delay-200'}`}>
                <h3 className="relative z-10 text-3xl md:text-5xl font-black text-white/80 uppercase tracking-widest whitespace-nowrap -rotate-90 select-none">
                    {project.name}
                </h3>
            </div>
        </motion.div>
    );
};

export default AllProjects;
