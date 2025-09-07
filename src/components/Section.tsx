import React from 'react';

const Section = ({
    children,
    className,
    id,
}: {
    children: React.ReactNode;
    className?: string;
    id?: string;
}) => {
    return (
        <section
            id={id}
            className={`pb-20 lg:pb-32 scroll-mt-20 lg:scroll-mt-20 overflow-hidden ${
                className ? className : ''
            }`}
        >
            <div className="container m-auto w-full">{children}</div>
        </section>
    );
};

export default Section;
