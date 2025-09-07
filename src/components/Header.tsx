import { useMediaQuery } from '@uidotdev/usehooks';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { GrGithub } from 'react-icons/gr';
import { BsEnvelope, BsLinkedin } from 'react-icons/bs';

const links = [
    { id: 1, link: 'home', name: 'Home' },
    { id: 2, link: 'experience', name: 'Experience' },
    { id: 3, link: 'works', name: 'Works' },
    { id: 4, link: 'contacts', name: 'Contacts' },
];

const Header = () => {
    const isMd = useMediaQuery('(min-width: 48rem)');
    const [menuOpen, setMenuOpen] = useState(false);
    const mobNav = useRef(null);

    const handleMenuToggle = () => {
        setMenuOpen((prev) => !prev);
    };
    const handleMenuClose = () => {
        setMenuOpen(false);
    };

    useEffect(() => {
        if (!mobNav.current) return;
        if (isMd) {
            gsap.set(mobNav.current, { clearProps: 'all' });
            setMenuOpen(false);
        }
    }, [isMd]);

    useGSAP(
        () => {
            if (!mobNav.current) return;
            if (!isMd) {
                if (menuOpen) {
                    gsap.to(mobNav.current, {
                        x: 0,
                        opacity: 1,
                        duration: 0.3,
                        ease: 'power2.out',
                        pointerEvents: 'auto',
                    });
                } else {
                    gsap.to(mobNav.current, {
                        x: '100%',
                        opacity: 0,
                        duration: 0.3,
                        ease: 'power2.in',
                        pointerEvents: 'none',
                    });
                }
            }
        },
        { dependencies: [menuOpen, isMd] }
    );

    return (
        <>
            <header className="fixed z-20 w-full bg-black md:bg-black/10 md:backdrop-blur-sm">
                <div className="container mx-auto flex items-center py-4">
                    {!isMd && (
                        <button
                            title="menu"
                            onClick={handleMenuToggle}
                            className="relative ml-auto mr-2 flex cursor-pointer flex-col w-8 h-6 justify-center gap-2 z-10"
                        >
                            <span
                                className={`h-[2px] bg-white transition-all ${
                                    menuOpen
                                        ? 'rotate-45 translate-y-[10px]'
                                        : ''
                                }`}
                            ></span>
                            <span
                                className={`h-[2px] bg-white transition-all ${
                                    menuOpen ? 'opacity-0' : ''
                                }`}
                            ></span>
                            <span
                                className={`h-[2px] bg-white transition-all ${
                                    menuOpen
                                        ? '-rotate-45 -translate-y-[10px]'
                                        : ''
                                }`}
                            ></span>
                        </button>
                    )}

                    <nav
                        ref={mobNav}
                        className="fixed z-[5] flex flex-col left-0 top-14 right-0 bottom-0 bg-black opacity-0 translate-x-full pointer-events-none md:flex-row md:justify-between md:static md:bg-transparent md:opacity-100 md:translate-x-0 md:pointer-events-auto md:grow"
                    >
                        <ul className="h-full flex flex-col justify-center items-center gap-8 text-3xl md:h-auto md:flex-row md:text-sm">
                            {links.map((item) => (
                                <li key={item.id}>
                                    <a
                                        onClick={handleMenuClose}
                                        href={`#${item.link}`}
                                        className="hover:text-teal-500"
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap items-center gap-8 justify-center py-8 md:py-0 md:gap-6">
                            <a
                                href="https://github.com/hesrun"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=""
                            >
                                <GrGithub className="text-xl md:text-lg hover:text-teal-500 transition-all" />
                            </a>
                            <a
                                href="https://linkedin.com/in/vladyslav-otroshchenko"
                                target="_blank"
                                rel="noopener noreferrer"
                                className=""
                            >
                                <BsLinkedin className="text-xl md:text-lg hover:text-teal-500 transition-all" />
                            </a>
                            <a href="mailto:info@hesrun.cz" className="">
                                <BsEnvelope className="text-xl md:text-lg hover:text-teal-500 transition-all" />
                            </a>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Header;
