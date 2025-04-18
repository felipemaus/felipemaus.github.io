
import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  duration?: number;
}

const LoadingAnimation = ({ duration = 2000 }: LoadingAnimationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-t-4 border-primary rounded-full animate-spin"></div>
        
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-serif font-bold text-gradient">Portfolio</h1>
          <p className="mt-4 text-muted-foreground">Loading amazing content...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
