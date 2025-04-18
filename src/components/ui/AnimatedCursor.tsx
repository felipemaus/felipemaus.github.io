
import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const AnimatedCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);

    const handleLinkHoverEvents = () => {
      const links = document.querySelectorAll('a, button');
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => setLinkHovered(true));
        link.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseenter', updatePosition);
    document.addEventListener('mouseleave', () => setHidden(true));
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    
    handleLinkHoverEvents();
    
    const cursorTimeout = setTimeout(() => {
      handleLinkHoverEvents();
    }, 2000);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseenter', updatePosition);
      document.removeEventListener('mouseleave', () => setHidden(true));
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      clearTimeout(cursorTimeout);
    };
  }, []);

  const cursorStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: `translate(-50%, -50%) scale(${clicked ? 0.5 : linkHovered ? 2 : 1})`,
    border: `${clicked ? '0px' : '2px'} solid ${linkHovered ? 'transparent' : 'var(--primary)'}`,
    backgroundColor: linkHovered ? 'rgba(123, 105, 171, 0.2)' : clicked ? 'var(--primary)' : 'transparent',
  };

  return (
    <>
      <div 
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[9999] transition-all duration-150 ease-out hidden md:block"
        style={cursorStyle}
      />
      <div 
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-[9999] transition-transform duration-300 ease-out hidden md:block"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          opacity: hidden ? 0 : 1,
          transform: `translate(-50%, -50%)`,
        }}
      />
    </>
  );
};

export default AnimatedCursor;
