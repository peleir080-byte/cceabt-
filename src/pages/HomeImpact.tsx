import Hero from '../components/Hero';
import Stats from '../components/Stats';
import About from '../components/About';
import Actions from '../components/Actions';
import Members from '../components/Members';
import News from '../components/News';
import Contact from '../components/Contact';

export default function HomeImpact() {
  return (
    <>
      <Hero variant="impact" />
      <Actions />
      <Stats />
      <News />
      <About />
      <Members />
      <Contact />
    </>
  );
}
