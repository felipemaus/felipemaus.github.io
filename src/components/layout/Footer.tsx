
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-2xl font-serif font-bold text-white">Portfolio</a>
            <p className="mt-2 text-white/70 max-w-md">
              Creating beautiful digital experiences with clean code and thoughtful design.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div>
              <h4 className="font-medium mb-3 text-white/90">Quick Links</h4>
              <ul className="space-y-2">
                {['Home', 'About', 'Projects', 'Skills', 'Contact'].map(link => (
                  <li key={link}>
                    <a 
                      href={`#${link.toLowerCase()}`}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3 text-white/90">Social</h4>
              <ul className="space-y-2">
                {[
                  { name: 'LinkedIn', url: '#' },
                  { name: 'GitHub', url: '#' },
                  { name: 'Twitter', url: '#' },
                  { name: 'Instagram', url: '#' },
                  { name: 'Dribbble', url: '#' }
                ].map(social => (
                  <li key={social.name}>
                    <a 
                      href={social.url}
                      className="text-white/70 hover:text-white transition-colors duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            © {currentYear} My Portfolio. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
