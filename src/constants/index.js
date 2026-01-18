const flavorlists = [
  {
    name: "DoOrDue",
    color: "brown",
    rotation: "rotate-[-8deg]",
    link: "https://doordue.vercel.app",
  },
  {
    name: "OfficeOrDue",
    color: "blue",
    rotation: "rotate-[8deg]",
    link: "https://officeordue.vercel.app",
  },
  {
    name: "ReachFirst",
    color: "purple",
    rotation: "rotate-[-8deg]",
    link: "https://reachfirst.vercel.app",
  },
];

const nutrientLists = [
  { label: "Potassium", amount: "245mg" },
  { label: "Calcium", amount: "500mg" },
  { label: "Vitamin A", amount: "176mcg" },
  { label: "Vitamin D", amount: "5mcg" },
  { label: "Iron", amount: "1mg" },
];

const techStack = [
  {
    category: "Frontend Development",
    technologies: [
      "React.js",
      "Next.js",
      "Bootstrap",
      "Figma (UI/UX Design)"
    ],
    rotation: "rotate-z-[-8deg]",
    translation: "translate-y-[-3%]",
  },
  {
    category: "Backend Development",
    technologies: [
      "Express.js",
      "Node.js",
      "Django"
    ],
    rotation: "rotate-z-[5deg]",
    translation: "translate-y-[2%]",
  },
  {
    category: "Core Programming",
    technologies: [
      "Python",
      "Java",
      "C",
      "C++"
    ],
    rotation: "rotate-z-[-6deg]",
    translation: "translate-y-[-4%]",
  },
  {
    category: "Database & Backend Services",
    technologies: [
      "SQL",
      "MongoDB",
      "Firebase",
      "Supabase"
    ],
    rotation: "rotate-z-[7deg]",
    translation: "translate-y-[3%]",
  },
  {
    category: "Tools & Platforms",
    technologies: [
      "Git",
      "GitHub",
      "Tableau",
      "Ultimaker Cura"
    ],
    rotation: "rotate-z-[-5deg]",
    translation: "translate-y-[-2%]",
  },
  {
    category: "Other / Core Skills",
    technologies: [
      "Problem Solving",
      "Soft Skills",
      "Using AI Efficiently"
    ],
    rotation: "rotate-z-[6deg]",
    translation: "translate-y-[4%]",
  },
];

const cards = [
  {
    src: "/images/card_x.png",
    rotation: "rotate-z-[-10deg]",
    name: "X (Twitter)",
    img: "/images/card_x.png",
    translation: "translate-y-[-5%]",
    link: "https://x.com/ashitoshh01"
  },
  {
    src: "/images/card_linkedin.png",
    rotation: "rotate-z-[4deg]",
    name: "LinkedIn",
    img: "/images/card_linkedin.png",
    link: "https://www.linkedin.com/in/ashitosh01"
  },
  {
    src: "/images/card_github.png",
    rotation: "rotate-z-[-10deg]",
    name: "GitHub",
    img: "/images/card_github.png",
    translation: "translate-y-[5%]",
    link: "https://github.com/ashitoshh01"
  },
];

export { flavorlists, nutrientLists, cards, techStack };
