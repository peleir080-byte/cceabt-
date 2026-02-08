import Hero from '../components/Hero';
import About from '../components/About';
import Actions from '../components/Actions';
import Contact from '../components/Contact';

export default function HomeMinimal() {
  return (
    <>
      <Hero variant="minimal" />
      <About />
      <Actions />
      <Contact />
    </>
  );
}
