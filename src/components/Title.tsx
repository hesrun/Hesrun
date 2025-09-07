import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
interface MyTitle {
    type: 'h1' | 'h2';
    className?: string;
    children: React.ReactNode;
}

gsap.registerPlugin(ScrollTrigger, SplitText);

const Title = ({ type, className, children }: MyTitle) => {
    const title = useRef<HTMLElement | null>(null);
    const Type = type;

    useGSAP(() => {
        document.fonts.ready.then(() => {
            const split = new SplitText(title.current, { type: 'chars' });
            gsap.from(split.chars, {
                opacity: 0,
                x: 50,
                stagger: 0.03,
                duration: 0.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: title.current,
                    start: 'top 80%',
                    scrub: false,
                    //markers: true,
                },
            });
        });
    });
    return (
        <Type
            ref={title}
            className={`text-3xl xl:text-6xl text-balance text-black font-bold uppercase text-stroke text-center ${className} `}
        >
            {children}
        </Type>
    );
};

export default Title;
