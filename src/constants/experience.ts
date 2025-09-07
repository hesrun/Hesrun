interface Experience {
    id: number;
    year: string;
    position: string;
    company: string;
    text: string;
}
const experience: Experience[] = [
    {
        id: 1,
        year: '02/2013 - 01/2016',
        position: 'Frontend Developer',
        company: 'Helpmed',
        text: 'Fully responsible for frontend at a telemedicine startup: developed 50+ pages, created a custom UI framework, and implemented modern markup approaches using HTML, CSS, SASS, JavaScript, jQuery, Twig, XML, and Git. Improved development speed and user experience.',
    },
    {
        id: 2,
        year: '04/2014 - Today',
        position: 'Frontend Developer',
        company: 'Freelance',
        text: 'Completed 30+ projects from landing pages to 20+ page applications. Used HTML, CSS, SASS, JavaScript, Typescript, React, jQuery, Bootstrap, Materialize, Semantic UI, Tailwind, GSAP, ScrollMagic, npm, Gulp, Git, and responsive design. Managed projects independently and optimized user experience across devices.',
    },
    {
        id: 3,
        year: '03/2016 - 11/2018',
        position: 'Frontend Developer',
        company: 'Wsalus / Call2Doc',
        text: 'Led frontend development at a telemedicine startup: built ~40 pages using Materialize, Bootstrap, Semantic UI, and Git. Developed a hybrid mobile app with Ionic Framework, improving feature delivery and user experience.',
    },
    {
        id: 4,
        year: '02/2019 - 12/2024',
        position: 'Frontend Developer / IT Specialist',
        company: 'Stmaria',
        text: 'Developed and improved OpenCart-based e-commerce store. Implemented full UI redesign and usability enhancements using HTML, CSS, JavaScript, jQuery, Bootstrap, PHP, and SQL. Applied Google Analytics to optimize conversions and managed store promotion via Google Ads, Seznam, Zbozi, Heureka, and other CPC platforms.',
    },
    {
        id: 5,
        year: '05/2023 - Today',
        position: 'Frontend Developer',
        company: 'Tehmart.com',
        text: 'Part-time frontend developer at a web studio: implemented UI, responsive layouts, and frontend optimizations using HTML, CSS, SCSS, JavaScript, jQuery, React, GSAP, Tailwind, Bootstrap, npm, and Git. Work ranges from small updates to full multi-page projects applying responsive design principles.',
    },
];

export default experience;
