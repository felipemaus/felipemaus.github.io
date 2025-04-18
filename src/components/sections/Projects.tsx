import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Influence, Higra, Paperon } from "@/assets/projects";

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  repoUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "99Influence",
    description:
      "It is a web Marketing Place, where influencers and brands can make contact and have a market base.",
    tags: ["Next.js", "Node.js", "TypeScript", "Material UI", "PAGARME API"],
    image: Influence,
    liveUrl: "https://www.99influence.com/",
  },
  {
    id: 2,
    title: "Paperon",
    description:
      "Business management system. The project is based on organizing the sectors, projects and teams of an organization. It records hours and also receives employees' invoices and receipts.",
    tags: ["React", "Material UI", "Google Auth API", "Node.js"],
    image: Paperon,
    liveUrl: "https://paperon.app/",
  },
  {
    id: 3,
    title: "Higra",
    description:
      "It is a water pump management system. It has two environments: web and app. Both are configured to integrate and consume data via IoT. I worked on both versions of this system. The web version was developed in ReactJS and the mobile version in React Native.",
    tags: ["React", "JavaScript", "AWS Amplify", "Iot", "GraphQL"],
    image: Higra,
    liveUrl: "https://cco.higra.com.br/login",
  },
];

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (cardRef.current) {
              cardRef.current.classList.add("animate-scale-in");
              cardRef.current.classList.remove("opacity-0");
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="opacity-0 card-hover bg-white rounded-lg overflow-hidden shadow-lg group relative"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="relative h-60 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="View live site"
              >
                <ExternalLink size={18} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors duration-300"
                aria-label="View source code"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 bg-secondary rounded-full text-secondary-foreground font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(PROJECTS);
  const sectionRef = useRef<HTMLElement>(null);

  const filterTags = [
    "All",
    "React",
    "Node.js",
    "Material UI",
    "TypeScript",
    "Next.js",
  ];

  useEffect(() => {
    if (activeTab.toLowerCase() === "all") {
      setFilteredProjects(PROJECTS);
    } else {
      setFilteredProjects(
        PROJECTS.filter((project) =>
          project.tags.some(
            (tag) => tag.toLowerCase() === activeTab.toLowerCase()
          )
        )
      );
    }
  }, [activeTab]);

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
    <section id="projects" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 opacity-0">
          <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Here are some of my personal and professional worked projects. I hope
          you enjoy =D
        </p>

        <div className="flex justify-center flex-wrap gap-2 mb-12">
          {filterTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTab(tag.toLowerCase())}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                activeTab === tag.toLowerCase()
                  ? "bg-red-400 text-primary-foreground shadow-md shadow-primary/30"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
