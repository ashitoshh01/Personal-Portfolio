import { TubelightNavbar } from "./TubelightNavbar";
import { Home, User, Briefcase, Mail } from "lucide-react";

const NavBar = () => {
  const navItems = [
    { name: "Home", url: "#hero", icon: Home },
    { name: "About", url: "#message", icon: User },
    { name: "Projects", url: "#flavor", icon: Briefcase },
    { name: "Contact", url: "#footer", icon: Mail },
  ];

  return (
    <>
      {/* Logo */}
      <div className="fixed top-0 left-0 z-50 md:p-9 p-3">
        <img src="/Personal-Portfolio/ashitosh-logo.png" alt="Ashitosh Lavhate" className="md:w-36 w-32 -mt-3" />
      </div>

      {/* Tubelight Navigation */}
      <TubelightNavbar items={navItems} />
    </>
  );
};

export default NavBar;
