
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface SectionTitleProps {
  title: string;
  highlightedText?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

const SectionTitle = ({
  title,
  highlightedText,
  description,
  centered = true,
  className = '',
}: SectionTitleProps) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
  });

  const baseClasses = `opacity-0 transition-all duration-700 ${
    isIntersecting ? 'opacity-100 translate-y-0' : 'translate-y-10'
  }`;

  const renderTitle = () => {
    if (!highlightedText) {
      return <h2 className="text-4xl md:text-5xl font-bold">{title}</h2>;
    }

    const parts = title.split(highlightedText);
    return (
      <h2 className="text-4xl md:text-5xl font-bold">
        {parts[0]}
        <span className="text-gradient">{highlightedText}</span>
        {parts[1]}
      </h2>
    );
  };

  return (
    <div
      ref={ref}
      className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}
    >
      <div className={baseClasses} style={{ transitionDelay: '100ms' }}>
        {renderTitle()}
      </div>
      
      {description && (
        <div
          className={`${baseClasses} mt-4`}
          style={{ transitionDelay: '300ms' }}
        >
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      )}
    </div>
  );
};

export default SectionTitle;
