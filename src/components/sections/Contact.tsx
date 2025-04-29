import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Linkedin } from "@/assets";
import { SocialMediaLinks } from "@/models/SocialMediaLinks";
//  "instagram", "linkedin", "github"
const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

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

            if (formRef.current) {
              formRef.current.classList.add("animate-slide-in-left");
              formRef.current.classList.remove("opacity-0");
            }

            if (infoRef.current) {
              infoRef.current.classList.add("animate-slide-in-right");
              infoRef.current.classList.remove("opacity-0");
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
    <section id="contact" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 opacity-0">
          Get In <span className="text-gradient">Touch</span>
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Have a project in mind or want to collaborate? Please contact me, i
          will enjoy meet you!
        </p>

        <div ref={infoRef} className="opacity-0 flex flex-col justify-center">
          <div className="bg-gradient-to-r  p-8 w-full   shadow-lg relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <h3 className="text-2xl font-semibold mb-6 relative z-10">
              Contact Information
            </h3>

            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a
                    href="mailto:felipefloresmaus@gmail.com"
                    className="text-red/400 hover:text-red-400 transition-colors duration-300"
                  >
                    felipefloresmaus@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Phone</h4>
                  <a
                    href="tel:+1234567890"
                    className="text-red/400 hover:text-red-400 transition-colors duration-300"
                  >
                    +55 (51) 981330055
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-red/400 hover:text-red-400 transition-colors duration-300">
                    Campo Bom, Rio Grande do Sul
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 relative z-10">
              <h4 className="font-medium mb-4">Follow Me</h4>
              <div className="flex gap-4">
                {SocialMediaLinks.map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-black/10 rounded-full hover:bg-black/20 transition-colors duration-300"
                    aria-label={`Follow on ${platform.name}`}
                  >
                    <span className="sr-only">Follow on {platform.name}</span>
                    <img
                      src={
                        platform.name === "linkedin"
                          ? Linkedin
                          : `https://simpleicons.org/icons/${platform.name}.svg`
                      }
                      alt={platform.name}
                      className="w-5 h-5 invert "
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
