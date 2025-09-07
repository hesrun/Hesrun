import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ContactForm from '../ContactForm';
import ContactsLinks from '../ContactsLinks';
import Title from '../Title';

const Contacts = () => {
    useGSAP(() => {
        gsap.from('#form', {
            opacity: 0,
            y: 100,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#form',
                start: 'top 80%',
                //markers: true,
            },
        });
    });
    return (
        <div>
            <Title type="h2" className="mb-16">
                Contact me
            </Title>
            <div id="form" className="mx-auto max-w-[800px] grid gap-8">
                <ContactsLinks />
                <ContactForm />
            </div>
        </div>
    );
};

export default Contacts;
