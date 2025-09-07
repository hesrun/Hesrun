import { useGSAP } from '@gsap/react';
import TechList from '../../components/TechList';
import PhotoParallax from '../PhotoParallax';
import Title from '../Title';
import gsap from 'gsap';
import { useMediaQuery } from '@uidotdev/usehooks';

const Home = () => {
    const isXl = useMediaQuery('(min-width: 80rem)');

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 1 });
        tl.from('.home-text', {
            opacity: 0,
            y: 50,
            duration: 0.6,
            ease: 'power2.out',
        });
        tl.from(
            '.home-skills',
            {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: 'power2.out',
            },
            '-=0.3'
        );
    });
    return (
        <div className="xl:flex justify-between gap-30">
            <div className="max-w-250">
                <Title type="h1" className="mb-6 xl:text-left">
                    Vladyslav <br />
                    Otroshchenko
                </Title>
                <div className="home-text mb-6">
                    I’m a <b className="text-teal-500">Frontend Developer</b>{' '}
                    with <b className="text-teal-500">10 years of experience</b>
                    , passionate about creating visually stunning and
                    interactive user interfaces. Over the past decade, I’ve
                    contributed to <b className="text-teal-500">30+ projects</b>
                    , building engaging landing pages, crafting beautiful UI
                    elements, and implementing smooth animations that enhance
                    the user experience. I love turning ideas into pixel-perfect
                    designs and bringing them to life in the browser.
                </div>
                <div className="home-skills">
                    <h3 className="mb-4">Some of my tech skills:</h3>
                    <TechList />
                </div>
            </div>
            {isXl && <PhotoParallax />}
        </div>
    );
};

export default Home;
