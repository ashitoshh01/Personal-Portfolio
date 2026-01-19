import { TubelightNavbar } from "./TubelightNavbar";
import { Home, User, Briefcase, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      if (window.lenis) {
        window.lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      navigate("/");
      // Ensure we scroll to top after navigation
      setTimeout(() => {
        if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }, 100);
    }
  };

  const navItems = [
    { name: "Home", url: "#hero", icon: Home },
    { name: "About", url: "#message", icon: User },
    { name: "Projects", url: "#flavor", icon: Briefcase },
    { name: "Contact", url: "#footer", icon: Mail },
  ];

  return (
    <>
      {/* Logo */}
      <div
        className="fixed top-0 left-0 z-50 md:p-9 p-3 cursor-pointer transition-opacity hover:opacity-80"
        onClick={handleLogoClick}
      >
        <img src="/ashitosh-logo.png" alt="Ashitosh Lavhate" className="md:w-36 w-32 -mt-3" />
      </div>

      {/* Tubelight Navigation */}
      <TubelightNavbar items={navItems} />
    </>
  );
};

export default NavBar;
