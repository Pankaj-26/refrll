import { useRef, useState, useEffect } from 'react';
import { computePosition, flip, shift, offset } from '@floating-ui/dom';

export function useFloatingUI() {
  const referenceRef = useRef(null);
  const floatingRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && referenceRef.current && floatingRef.current) {
      const updatePosition = async () => {
        const pos = await computePosition(
          referenceRef.current,
          floatingRef.current,
          {
            placement: 'bottom-start',
            middleware: [offset(4), flip(), shift({ padding: 8 })]
          }
        );
        
        setPosition({
          top: pos.y,
          left: pos.x
        });
      };

      updatePosition();
      
      // Add event listeners
      const handleScroll = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', updatePosition);
      
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen]);

  return {
    referenceRef,
    floatingRef,
    position,
    isOpen,
    setIsOpen
  };
}