import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import useParallax from '../hooks/useParallax';

const PhotoParallax = () => {
    const coords = useParallax(0.1);
    const mainLayer = useRef<HTMLImageElement>(null);
    const layer1Ref = useRef<HTMLImageElement>(null);
    const layer2Ref = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        if (!mainLayer.current || !layer1Ref.current || !layer2Ref.current)
            return;

        const tl = gsap.timeline({ delay: 0.5 });
        tl.from(mainLayer.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: 'power2.out',
        });
        tl.fromTo(
            layer1Ref.current,
            { opacity: 0, scale: 1 },
            { opacity: 0.1, scale: 1.1, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
        );
        tl.fromTo(
            layer2Ref.current,
            { opacity: 0, scale: 1 },
            { opacity: 0.1, scale: 1.2, duration: 0.6, ease: 'power2.out' },
            '-=0.4'
        );
    });

    useEffect(() => {
        const animate = () => {
            if (layer1Ref.current) {
                gsap.to(layer1Ref.current, {
                    x: coords.current.x * 0.05,
                    y: coords.current.y * 0.05,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            }
            if (layer2Ref.current) {
                gsap.to(layer2Ref.current, {
                    x: coords.current.x * 0.1,
                    y: coords.current.y * 0.1,
                    ease: 'power2.out',
                    overwrite: 'auto',
                });
            }
            requestAnimationFrame(animate);
        };
        animate();
    }, [coords]);

    return (
        <div className="relative max-w-80 mx-auto">
            <img
                ref={mainLayer}
                className="rounded-4xl"
                src="/my-self.jpeg"
                alt="Portrait"
            />
            <img
                ref={layer1Ref}
                className="rounded-4xl absolute top-0 left-0 z-[-1]"
                src="/my-self.jpeg"
                alt="Shadow Layer 1"
            />
            <img
                ref={layer2Ref}
                className="rounded-4xl absolute top-0 left-0 z-[-2]"
                src="/my-self.jpeg"
                alt="Shadow Layer 2"
            />
        </div>
    );
};

export default PhotoParallax;
