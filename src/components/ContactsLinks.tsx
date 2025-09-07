import { BsEnvelope, BsLinkedin } from 'react-icons/bs';
import { GrGithub } from 'react-icons/gr';

const ContactsLinks = () => {
    return (
        <div className="flex flex-wrap items-center gap-4 justify-center">
            <a
                href="https://github.com/hesrun"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm items-center border border-teal-500 px-4 py-2 text-teal-500 rounded-full gap-2 hover:bg-teal-500 hover:text-black transition-all"
            >
                <GrGithub className="text-xl" />
                Github
            </a>
            <a
                href="https://linkedin.com/in/vladyslav-otroshchenko"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm items-center border border-teal-500 px-4 py-2 text-teal-500 rounded-full gap-2 hover:bg-teal-500 hover:text-black transition-all"
            >
                <BsLinkedin className="text-xl" />
                LinkedIn
            </a>
            <a
                href="mailto:info@hesrun.cz"
                className="inline-flex text-sm items-center border border-teal-500 px-4 py-2 text-teal-500 rounded-full gap-2 hover:bg-teal-500 hover:text-black transition-all"
            >
                <BsEnvelope className="text-xl" />
                Email
            </a>
        </div>
    );
};

export default ContactsLinks;
