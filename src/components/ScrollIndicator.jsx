import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown } from "lucide-react";

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(false);

    useEffect(() => {
        let timeout;

        const handleScroll = () => {
            // Hide while scrolling
            setIsVisible(false);
            clearTimeout(timeout);

            // Check if at bottom
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
                setIsAtBottom(true);
            } else {
                setIsAtBottom(false);
                // Show after 1.5s of inactivity if not at bottom
                timeout = setTimeout(() => {
                    setIsVisible(true);
                }, 1000);
            }
        };

        window.addEventListener("scroll", handleScroll);
        // Initial check
        timeout = setTimeout(() => {
            if (window.scrollY < 100) setIsVisible(true);
        }, 2000);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearTimeout(timeout);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && !isAtBottom && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none mix-blend-difference"
                >
                    <span className="text-white text-sm uppercase tracking-widest font-bold">Scroll</span>
                    <div className="w-[30px] h-[50px] border-2 border-white/50 rounded-full flex justify-center p-2 relative">
                        <motion.div
                            animate={{ y: [0, 15], opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ScrollIndicator;
