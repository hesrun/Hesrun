import { useRef } from 'react';
import experience from '../../constants/experience';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Title from '../Title';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const container = useRef(null);
    const lineRef = useRef(null);

    useGSAP(
        () => {
            gsap.fromTo(
                lineRef.current,
                {
                    yPercent: -100,
                },
                {
                    yPercent: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: container.current,
                        start: 'top 75%',
                        end: 'bottom 75%',
                        scrub: true,
                        //markers: true,
                    },
                }
            );

            gsap.utils.toArray<HTMLElement>('.exp-item').forEach((el) => {
                gsap.from(el.querySelector('.exp-year'), {
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 70%',
                        scrub: false,
                        //markers: true,
                    },
                });

                gsap.fromTo(
                    el.querySelector('.exp-info'),
                    {
                        clipPath: 'inset( 0% 0% 100% 0% )',
                    },
                    {
                        clipPath: 'inset(0% 0% 0% 0%)',
                        duration: 0.6,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 70%',
                            scrub: false,
                            //markers: true,
                        },
                    }
                );
            });
        },
        { scope: container }
    );

    return (
        <>
            <Title type="h2" className="mb-16">
                The Road of My Experience
            </Title>
            <ul className="relative" ref={container}>
                {experience.map((item, index) => (
                    <li
                        key={item.id}
                        className={`exp-item grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-start relative group pl-14 lg:pl-0 py-10 lg:py-16`}
                    >
                        <div
                            className={`exp-year flex lg:sticky top-32 ${
                                index % 2 === 0
                                    ? 'lg:order-3 lg:justify-start '
                                    : 'lg:justify-end '
                            }`}
                        >
                            <span
                                className={`bg-teal-400 px-4 py-2 text-black text-sm uppercase font-bold rounded-2xl`}
                            >
                                {item.year}
                            </span>
                        </div>
                        <div className="absolute left-2 top-11 lg:static  w-6 h-6 lg:w-9 lg:h-9 border-7 lg:border-8 border-black outline-2 outline-teal-500 bg-teal-500 rounded-full "></div>
                        <div
                            className={`exp-info max-w-lg ${
                                index % 2 === 0
                                    ? 'lg:-order-1 lg:text-right lg:ml-auto'
                                    : ''
                            }`}
                        >
                            <h2
                                className="text-[var(--beige)] uppercase text-xl mt-1 mb-3 tracking-wider
"
                            >
                                {item.company}
                            </h2>
                            <h3 className="mb-2 text-teal-500">
                                {item.position}
                            </h3>
                            <div className="lg:text-lg font-light text-left">
                                {item.text}
                            </div>
                        </div>
                    </li>
                ))}
                <div className="absolute top-0 w-[2px] h-full left-[19px] lg:left-1/2 -z-1 overflow-hidden">
                    <div
                        ref={lineRef}
                        className="w-full h-full bg-gradient-to-b from-teal-900 from-90% to-teal-200 to-100%"
                    ></div>
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                'linear-gradient(to bottom, rgba(0,0,0,1) 0%, transparent 10%, transparent 90%, rgba(0,0,0,1) 100%)',
                        }}
                    />
                </div>
            </ul>
        </>
    );
};

export default Experience;
