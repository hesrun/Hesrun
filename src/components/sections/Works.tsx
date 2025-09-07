import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import useWorks from '../../hooks/useWorks.js';
import TechList from '../TechList.js';
import { LuExternalLink } from 'react-icons/lu';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import Title from '../Title.js';
import { useMediaQuery } from '@uidotdev/usehooks';

gsap.registerPlugin(ScrollTrigger);

const options = {
    renderMark: {
        [MARKS.BOLD]: (text: React.ReactNode) => <span>{text}</span>,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: any, children: React.ReactNode) => (
            <p>{children}</p>
        ),
    },
};
const Works = () => {
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const list = useRef(null);
    const imageRef = useRef<HTMLDivElement | null>(null);
    const { data } = useWorks();
    const isMd = useMediaQuery('(min-width: 48rem)');

    const quickX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
    const quickY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
    const mousePos = useRef({ x: 0, y: 0 });

    const handleMouseMove = (e: MouseEvent) => {
        quickX.current?.(e.clientX + 20);
        quickY.current?.(e.clientY + 20);
    };

    const handleMouseEnter = (image: string | null, e: React.MouseEvent) => {
        if (!image || !isMd) return;
        mousePos.current = { x: e.clientX + 20, y: e.clientY + 20 };
        setCurrentImage(image);
        window.addEventListener('mousemove', handleMouseMove);
    };

    const handleMouseLeave = () => {
        if (!isMd) return;
        window.removeEventListener('mousemove', handleMouseMove);
        if (imageRef.current) {
            gsap.to(imageRef.current, { opacity: 0, duration: 0.3 });
        }
        setCurrentImage(null);
    };

    useEffect(() => {
        if (data?.items?.length) {
            requestAnimationFrame(() => {
                ScrollTrigger.refresh();
            });
        }
    }, [data?.items?.length]);

    useGSAP(() => {
        if (currentImage && imageRef.current) {
            gsap.set(imageRef.current, {
                x: mousePos.current.x,
                y: mousePos.current.y,
                opacity: 0,
            });
            quickX.current = gsap.quickTo(imageRef.current, 'x', {
                duration: 0.3,
                ease: 'power2.out',
            });
            quickY.current = gsap.quickTo(imageRef.current, 'y', {
                duration: 0.3,
                ease: 'power2.out',
            });
            gsap.to(imageRef.current, { opacity: 1, duration: 0.3 });
        }
    }, [currentImage]);

    useGSAP(() => {
        gsap.utils.toArray<HTMLElement>('.work-item').forEach((el) => {
            gsap.from(el, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    scrub: false,
                    //markers: true,
                },
            });
        });
    }, [data?.items?.length]);
    return (
        <>
            <Title type="h2" className="mb-16">
                My works
            </Title>
            {data && data.items.length > 0 && (
                <ul ref={list} className="max-w-[900px] mx-auto">
                    {data.items.map((item) => {
                        const imageId = item.fields.image?.sys?.id;
                        const imageAsset = data.includes.Asset.find((asset) => {
                            return asset.sys.id === imageId;
                        });

                        const imageurl = imageAsset
                            ? `https:${imageAsset.fields.file.url}`
                            : null;

                        return (
                            <li
                                key={item.sys.id}
                                className="work-item py-8 border-b border-teal-500/50 last-of-type:border-none"
                                onMouseEnter={(e) =>
                                    handleMouseEnter(imageurl, e)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                <a
                                    href={item.fields.url}
                                    className=""
                                    target="_blank"
                                >
                                    <h2 className="text-[var(--beige)] font-bold text-2xl hover:text-teal-500 transition-colors flex gap-4 items-center">
                                        {item.fields.title}
                                        <LuExternalLink className="text-xl text-teal-500" />
                                    </h2>
                                </a>
                                {!isMd && imageurl && (
                                    <div className="border-2 border-teal-500 rounded-xl overflow-hidden mt-4">
                                        <img
                                            src={imageurl}
                                            alt="Preview image"
                                            className="w-full"
                                        />
                                    </div>
                                )}
                                <div className="text-sm my-4 text-white/80">
                                    {documentToReactComponents(
                                        item.fields.description,
                                        options
                                    )}
                                </div>
                                <TechList list={item.fields.tech} />
                            </li>
                        );
                    })}
                    {currentImage && isMd && (
                        <div
                            ref={imageRef}
                            className="pointer-events-none fixed w-[400px] h-auto z-10 opacity-0 rounded-lg shadow-lg top-0 left-0 border-4 border-teal-500 overflow-hidden"
                        >
                            <img
                                src={currentImage}
                                alt="Preview image"
                                className="w-full"
                            />
                        </div>
                    )}
                </ul>
            )}
        </>
    );
};

export default Works;
