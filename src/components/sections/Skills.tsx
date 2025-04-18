import { useEffect, useRef } from "react";
import {
  Code,
  PenTool,
  Database,
  Server,
  Monitor,
  Smartphone,
} from "lucide-react";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "mobile";
}

interface SkillCategory {
  name: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Web Development",
    icon: <Code className="text-red-400" size={32} />,
    skills: [
      { name: "HTML/CSS", level: 90, category: "frontend" },
      { name: "JavaScript", level: 90, category: "frontend" },
      { name: "React", level: 100, category: "frontend" },
      { name: "Angular", level: 52, category: "frontend" },
      { name: "TypeScript", level: 90, category: "frontend" },
      { name: "Tailwind CSS", level: 90, category: "frontend" },
      { name: "Node.js", level: 40, category: "backend" },
      { name: "GraphQL", level: 40, category: "backend" },
      { name: "React Native", level: 50, category: "mobile" },
    ],
  },
  // {
  //   name: "Backend Development",
  //   icon: <Server className="text-red-400" size={32} />,
  //   skills: [
  //     { name: "Express", level: 10, category: "backend" },
  //     { name: "Python", level: 40, category: "backend" },
  //     { name: "MongoDB", level: 50, category: "backend" },
  //     { name: "PostgreSQL", level: 50, category: "backend" },
  //   ],
  // },
  // {
  //   name: "Mobile Development",
  //   icon: <Smartphone className="text-red-400" size={32} />,
  //   skills: [
  //     { name: "iOS Development", level: 40, category: "mobile" },
  //     { name: "Android Development", level: 40, category: "mobile" },
  //     { name: "App Performance", level: 40, category: "mobile" },
  //   ],
  // },
];

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (barRef.current) {
              barRef.current.style.width = `${skill.level}%`;
              barRef.current.classList.add("transition-all", "duration-1000");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [skill.level]);

  return (
    <div className="mb-4" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{skill.name}</span>
        <span className="text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="h-full rounded-full bg-gradient-to-r from-red-400 to-purple-dark"
          style={{ width: "0%" }}
        ></div>
      </div>
    </div>
  );
};

const SkillCategory = ({
  category,
  index,
}: {
  category: SkillCategory;
  index: number;
}) => {
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (categoryRef.current) {
              categoryRef.current.classList.add("animate-fade-in");
              categoryRef.current.classList.remove("opacity-0");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (categoryRef.current) {
      observer.observe(categoryRef.current);
    }

    return () => {
      if (categoryRef.current) {
        observer.unobserve(categoryRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={categoryRef}
      className="bg-white rounded-lg p-6 shadow-lg opacity-0 card-hover"
      style={{
        animationDelay: `${index * 0.2}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-secondary text-primary">
          {category.icon}
        </div>
        <h3 className="text-xl font-semibold">{category.name}</h3>
      </div>

      <div>
        {category.skills.map((skill, idx) => (
          <SkillBar key={skill.name} skill={skill} index={idx} />
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const heading = sectionRef.current?.querySelector("h2");
            if (heading) {
              heading.classList.add("animate-fade-in");
              heading.classList.remove("opacity-0");
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
    <section id="skills" ref={sectionRef} className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 opacity-0">
          My <span className="text-gradient">Skills</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          My technical expertise spans across various development and design
          domains, allowing me to build complete, polished products.
        </p>

        <div>
          {skillCategories.map((category, index) => (
            <SkillCategory
              key={category.name}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
