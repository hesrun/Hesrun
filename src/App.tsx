import Contacts from './components/sections/Contacts';
import Experience from './components/sections/Experience';
import Header from './components/Header';
import Home from './components/sections/Home';
import Section from './components/Section';
import Works from './components/sections/Works';

function App() {
    return (
        <>
            <Header />
            <Section id="home" className="min-h-dvh flex items-center pt-20">
                <Home />
            </Section>
            <Section id="experience">
                <Experience />
            </Section>
            <Section id="works">
                <Works />
            </Section>
            <Section id="contacts">
                <Contacts />
            </Section>
        </>
    );
}

export default App;
