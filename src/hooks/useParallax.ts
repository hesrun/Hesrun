import { useEffect, useRef } from 'react';

type Coords = {
    x: number;
    y: number;
};

const useParallax = (ease: number = 0.05) => {
    const coords = useRef<Coords>({ x: 0, y: 0 });

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        let rafId: number;

        const handleMouseMove = (e: MouseEvent) => {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX = e.clientX - centerX;
            mouseY = e.clientY - centerY;
        };

        const animate = () => {
            currentX += (mouseX - currentX) * ease;
            currentY += (mouseY - currentY) * ease;

            coords.current.x = currentX;
            coords.current.y = currentY;

            rafId = requestAnimationFrame(animate);
        };

        window.addEventListener('mousemove', handleMouseMove);
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(rafId);
        };
    }, [ease]);

    return coords;
};

export default useParallax;
