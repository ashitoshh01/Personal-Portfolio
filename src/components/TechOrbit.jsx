import { useEffect, useRef, useState } from "react";

// Generate evenly distributed points on a sphere using Fibonacci Sphere algorithm
const generateFibonacciSphere = (numPoints) => {
    const points = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = Math.PI * 2 * goldenRatio;

    for (let i = 0; i < numPoints; i++) {
        const t = i / numPoints;
        const inclination = Math.acos(1 - 2 * t);
        const azimuth = angleIncrement * i;

        points.push({
            phi: inclination,
            theta: azimuth,
        });
    }

    return points;
};

const BASE_TECHS = [
    { name: "React", emoji: "⚛️", color: "#61DAFB" },
    { name: "TypeScript", emoji: "TS", color: "#3178C6" },
    { name: "JavaScript", emoji: "JS", color: "#F7DF1E" },
    { name: "Node.js", emoji: "🟢", color: "#339933" },
    { name: "Next.js", emoji: "▲", color: "#000000" },
    { name: "Git", emoji: "📦", color: "#F05032" },
    { name: "Docker", emoji: "🐳", color: "#2496ED" },
    { name: "Figma", emoji: "🎨", color: "#F24E1E" },
    { name: "MongoDB", emoji: "🍃", color: "#47A248" },
    { name: "Python", emoji: "🐍", color: "#3776AB" },
    { name: "Firebase", emoji: "🔥", color: "#FFCA28" },
    { name: "Bootstrap", emoji: "🅱️", color: "#7952B3" },
    { name: "Express", emoji: "⚡", color: "#000000" },
    { name: "Tailwind", emoji: "🌊", color: "#06B6D4" },
    { name: "Redux", emoji: "🔷", color: "#764ABC" },
    { name: "Vue.js", emoji: "💚", color: "#4FC08D" },
    { name: "Angular", emoji: "🅰️", color: "#DD0031" },
    { name: "GraphQL", emoji: "◆", color: "#E10098" },
    { name: "AWS", emoji: "☁️", color: "#FF9900" },
    { name: "Supabase", emoji: "⚡", color: "#3ECF8E" },
];

// Generate evenly distributed positions
const positions = generateFibonacciSphere(20);
const TECHS = BASE_TECHS.map((tech, i) => ({
    ...tech,
    theta: positions[i].theta,
    phi: positions[i].phi,
}));

export default function TechOrbit() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const angleXRef = useRef(0);
    const angleYRef = useRef(0);
    const targetAngleXRef = useRef(0);
    const targetAngleYRef = useRef(0);

    const [paused, setPaused] = useState(false);
    const [direction, setDirection] = useState(1);
    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);
    const mouseXRef = useRef(0);
    const mouseYRef = useRef(0);

    // Convert spherical coordinates to 3D Cartesian with rotation
    const sphericalTo3D = (theta, phi, radius, rotX, rotY) => {
        // Base spherical to cartesian
        let x = radius * Math.sin(phi) * Math.cos(theta);
        let y = radius * Math.sin(phi) * Math.sin(theta);
        let z = radius * Math.cos(phi);

        // Rotate around Y axis
        const cosY = Math.cos(rotY);
        const sinY = Math.sin(rotY);
        const tempX = x * cosY - z * sinY;
        const tempZ = x * sinY + z * cosY;
        x = tempX;
        z = tempZ;

        // Rotate around X axis
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const tempY = y * cosX - z * sinX;
        z = y * sinX + z * cosX;
        y = tempY;

        return { x, y, z };
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const size = Math.min(500, window.innerWidth - 40);
            canvas.width = size;
            canvas.height = size;
        };

        resize();
        window.addEventListener("resize", resize);

        const render = () => {
            const radius = canvas.width * 0.32;
            const center = canvas.width / 2;
            const autoSpeed = 0.003;
            const mouseSpeed = 0.015;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update rotation angles
            if (!paused) {
                // Auto rotation
                angleYRef.current += autoSpeed * direction;
                angleXRef.current += autoSpeed * direction * 0.5;
            } else if (active) {
                // Mouse-controlled rotation when paused (with active tech)
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;

                // Calculate rotation based on mouse position
                const deltaX = (mouseXRef.current - centerX) / centerX;
                const deltaY = (mouseYRef.current - centerY) / centerY;

                targetAngleYRef.current += deltaX * mouseSpeed;
                targetAngleXRef.current += deltaY * mouseSpeed;

                // Smooth interpolation
                angleYRef.current += (targetAngleYRef.current - angleYRef.current) * 0.1;
                angleXRef.current += (targetAngleXRef.current - angleXRef.current) * 0.1;
            }

            // Calculate 3D positions and project to 2D
            const techWith3D = TECHS.map((tech) => {
                const pos3D = sphericalTo3D(
                    tech.theta,
                    tech.phi,
                    radius,
                    angleXRef.current,
                    angleYRef.current
                );

                // Perspective projection
                const perspective = 750;
                const scale = perspective / (perspective + pos3D.z);

                const x = center + pos3D.x * scale;
                const y = center + pos3D.y * scale;

                // BIGGER ICONS - Increased base size
                const baseSize = active === tech.name ? 60 : 50;
                const size = baseSize * scale;

                // Enhanced depth-based opacity
                // Front (z > 0) = full opacity, Back (z < 0) = reduced opacity
                let opacity;
                if (pos3D.z > 0) {
                    // Front half - full brightness
                    opacity = Math.max(0.85, Math.min(1, scale));
                } else {
                    // Back half - dramatically reduced
                    opacity = Math.max(0.15, Math.min(0.4, scale * 0.5));
                }

                // Blur based on depth and side position
                // More blur when: behind (z < 0) or far from center (low scale)
                const blurAmount = pos3D.z < 0
                    ? Math.max(2, (1 - scale) * 8)
                    : Math.max(0, (1 - scale) * 4);

                return {
                    ...tech,
                    x,
                    y,
                    z: pos3D.z,
                    size,
                    opacity,
                    scale,
                    blur: blurAmount,
                };
            });

            // Sort by z-depth (draw far ones first)
            techWith3D.sort((a, b) => a.z - b.z);

            // Draw subtle sphere outline
            ctx.strokeStyle = "rgba(210, 165, 116, 0.15)";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Draw each tech icon
            techWith3D.forEach((tech) => {
                const isActive = active === tech.name;
                const isHovered = hovered === tech.name;

                ctx.save();
                ctx.globalAlpha = tech.opacity;

                // Apply blur filter
                if (tech.blur > 0.5) {
                    ctx.filter = `blur(${tech.blur}px)`;
                }

                // Draw connection line if active/hovered
                if (isActive || isHovered) {
                    ctx.beginPath();
                    ctx.moveTo(center, center);
                    ctx.lineTo(tech.x, tech.y);
                    ctx.strokeStyle = `${tech.color}40`;
                    ctx.lineWidth = 3;
                    ctx.stroke();
                }

                // Draw outer glow
                ctx.beginPath();
                ctx.arc(tech.x, tech.y, tech.size / 2 + 10, 0, Math.PI * 2);
                ctx.fillStyle = isActive
                    ? `${tech.color}35`
                    : isHovered
                        ? "rgba(255,255,255,0.15)"
                        : "rgba(255,255,255,0.08)";
                ctx.fill();

                // Draw icon circle with gradient
                ctx.beginPath();
                ctx.arc(tech.x, tech.y, tech.size / 2, 0, Math.PI * 2);

                const gradient = ctx.createRadialGradient(
                    tech.x - tech.size * 0.25,
                    tech.y - tech.size * 0.25,
                    0,
                    tech.x,
                    tech.y,
                    tech.size / 2
                );

                if (isActive || isHovered) {
                    gradient.addColorStop(0, "#ffffff");
                    gradient.addColorStop(0.4, tech.color);
                    gradient.addColorStop(1, tech.color + "DD");
                } else {
                    gradient.addColorStop(0, "#ffffff");
                    gradient.addColorStop(1, "#f8f0e6");
                }

                ctx.fillStyle = gradient;
                ctx.fill();

                // Border
                ctx.strokeStyle = isActive
                    ? tech.color
                    : isHovered
                        ? "rgba(210, 165, 116, 0.7)"
                        : "rgba(210, 165, 116, 0.4)";
                ctx.lineWidth = isActive ? 3 : 2;
                ctx.stroke();

                // Reset filter for text
                ctx.filter = "none";

                // Draw emoji/text
                ctx.font = `bold ${tech.size * 0.5}px Arial`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillStyle = isActive || isHovered ? "#fff" : "#523122";
                ctx.fillText(tech.emoji, tech.x, tech.y);

                // Draw label if hovered or active
                if ((isHovered || isActive) && tech.opacity > 0.5) {
                    ctx.font = `bold ${Math.max(11, 11 * tech.scale)}px Arial`;
                    ctx.fillStyle = "#523122";
                    ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
                    ctx.shadowBlur = 6;
                    ctx.fillText(tech.name, tech.x, tech.y + tech.size / 2 + 18);
                    ctx.shadowBlur = 0;
                }

                ctx.restore();
            });

            animationRef.current = requestAnimationFrame(render);
        };

        render();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            window.removeEventListener("resize", resize);
        };
    }, [paused, direction, active, hovered]);

    const handleClick = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const center = canvas.width / 2;
        const radius = canvas.width * 0.32;

        const techWith3D = TECHS.map((tech, index) => {
            const pos3D = sphericalTo3D(
                tech.theta,
                tech.phi,
                radius,
                angleXRef.current,
                angleYRef.current
            );

            const perspective = 750;
            const scale = perspective / (perspective + pos3D.z);

            const x = center + pos3D.x * scale;
            const y = center + pos3D.y * scale;
            const baseSize = active === tech.name ? 60 : 50;
            const size = baseSize * scale;

            return {
                ...tech,
                x,
                y,
                z: pos3D.z,
                size,
                index,
            };
        });

        techWith3D.sort((a, b) => b.z - a.z);

        for (const tech of techWith3D) {
            const distance = Math.sqrt((mouseX - tech.x) ** 2 + (mouseY - tech.y) ** 2);
            if (distance < tech.size / 2) {
                if (active === tech.name) {
                    // Unselect and resume auto-rotation
                    setActive(null);
                    setPaused(false);
                } else {
                    // Select and pause, bring to front
                    setActive(tech.name);
                    setPaused(true);

                    // Calculate angles needed to bring this tech to front center
                    // Store current angles as target
                    targetAngleXRef.current = angleXRef.current;
                    targetAngleYRef.current = angleYRef.current;
                }
                return;
            }
        }

        // Click on empty space - toggle pause
        if (paused) {
            setActive(null);
            setPaused(false);
        } else {
            setPaused(true);
        }
    };

    const handleMouseMove = (e) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Store mouse position for rotation control
        mouseXRef.current = mouseX;
        mouseYRef.current = mouseY;

        if (paused && !active) return;

        const center = canvas.width / 2;
        const radius = canvas.width * 0.32;

        const techWith3D = TECHS.map((tech) => {
            const pos3D = sphericalTo3D(
                tech.theta,
                tech.phi,
                radius,
                angleXRef.current,
                angleYRef.current
            );

            const perspective = 750;
            const scale = perspective / (perspective + pos3D.z);

            const x = center + pos3D.x * scale;
            const y = center + pos3D.y * scale;
            const size = 50 * scale;

            return {
                name: tech.name,
                x,
                y,
                z: pos3D.z,
                size,
            };
        });

        techWith3D.sort((a, b) => b.z - a.z);

        let found = null;
        for (const tech of techWith3D) {
            const distance = Math.sqrt((mouseX - tech.x) ** 2 + (mouseY - tech.y) ** 2);
            if (distance < tech.size / 2) {
                found = tech.name;
                break;
            }
        }

        setHovered(found);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border-4 border-[#d4a574] p-6 md:p-8">
            <canvas
                ref={canvasRef}
                onMouseEnter={() => !paused && setDirection(-1)}
                onMouseLeave={() => {
                    if (!paused) setDirection(1);
                    setHovered(null);
                }}
                onMouseMove={handleMouseMove}
                onClick={handleClick}
                style={{
                    display: "block",
                    margin: "0 auto",
                    cursor: "pointer",
                    maxWidth: "100%",
                    height: "auto",
                }}
            />
        </div>
    );
}
