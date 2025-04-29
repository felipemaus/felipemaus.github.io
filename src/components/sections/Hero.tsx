import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { Formatura, FrontJPEG, TernoSelf, Walter } from "@/assets";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 20;
      const yPos = (clientY / window.innerHeight - 0.5) * 20;

      const bgElement = heroRef.current.querySelector(
        ".bg-element"
      ) as HTMLElement;
      if (bgElement) {
        bgElement.style.transform = `translate(${xPos}px, ${yPos}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage: `url(${FrontJPEG})`,
        }}
      />

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated background shapes */}
        <div className="bg-element absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-gradient-to-r from-red-400/20 to-purple-dark/20 blur-3xl transition-transform duration-300"></div>
        <div className="bg-element absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-gradient-to-r from-red-400/20 to-purple-dark/20 blur-3xl transition-transform duration-300"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="mb-2 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in">
            <span className="text-gradient text-red-400 animate-text-shimmer block">
              Felipe Flores Maus
            </span>
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground mt-6 max-w-2xl mx-auto animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
          >
            Just a Brazilian Frontend Developer that enjoy to make projects in
            products
          </p>

          <div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in opacity-0"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <button
              onClick={() => handleScrollToSection("projects")}
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:shadow-md hover:shadow-red-400 hover:-translate-y-1"
            >
              View My Work
            </button>

            <button
              onClick={() => handleScrollToSection("contact")}
              className="px-8 py-3 rounded-full bg-secondary text-secondary-foreground font-medium transition-all duration-300 hover:shadow-md hover:shadow-red-400 hover:-translate-y-1"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>

      {/* Scroll down button 
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-muted-foreground hover:text-foreground transition-colors duration-300 z-20"
        aria-label="Scroll down"
      >
        <ChevronDown size={32} />
      </button> */}
    </section>
  );
};

export default Hero;
