import { Formatura, TernoSelf, Walter } from "@/assets";
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.classList.add("animate-slide-in-left");
              imageRef.current.classList.remove("opacity-0");
            }
            if (textRef.current) {
              textRef.current.classList.add("animate-slide-in-right");
              textRef.current.classList.remove("opacity-0");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          About <span className="text-gradient">Me</span>
        </h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div ref={imageRef} className="lg:w-6/12 relative opacity-0">
            <div className="aspect-square max-w-md mx-auto overflow-hidden rounded-3xl relative shadow-xl">
              <img
                src={TernoSelf}
                alt="Developer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div ref={textRef} className="lg:w-7/12 opacity-0">
            {/* <h3 className="text-2xl md:text-3xl font-semibold mb-4">
              Creative Web Developer
            </h3> */}
            <p className="text-lg text-muted-foreground mb-6">
              My name is Felipe Flores Maus, i´m 23 years old and i live in
              Campo Bom, Brazil.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              I'm a front-end engineer, focused on React and Next.js, i
              specialyze myself in those technologies to make user-friendly
              experiences that solve real-world problems.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              With over 3 years of experience, I combine technical expertise
              with creative thinking to build custom solutions that help
              businesses grow their digital presence. I'm constantly exploring
              new technologies and approaches to create better, more intuitive
              web applications.
            </p>

            <p className="text-lg text-muted-foreground mb-8">
              Rigth now i´m seeking my degree in Analizy and Development Systems
              and coursing some Front-end certification to make my job better
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-hover bg-white/50 rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-2">My Approach</h4>
                <p className="text-muted-foreground">
                  I focus on clean, maintainable code and responsive design,
                  ensuring that websites look and perform flawlessly on all
                  devices.
                </p>
              </div>

              <div className="card-hover bg-white/50 rounded-lg p-6 shadow-lg">
                <h4 className="text-xl font-semibold mb-2">My Goal</h4>
                <p className="text-muted-foreground">
                  To help clients achieve their business objectives through
                  innovative digital solutions that provide exceptional user
                  experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
