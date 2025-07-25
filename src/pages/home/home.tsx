import { useState } from 'react';
import styles from './home.module.scss';
import {
  FullpageContainer,
  FullpageSection,
} from '@shinyongjun/react-fullpage';
import '@shinyongjun/react-fullpage/css';
import Footer from '@/layout/footer/footer';
import About from './components/about/about';
import Works from './components/works/works';
import Exhibition from './components/exhibition/exhibition';
import Masterpiece from './components/masterpiece/masterpiece';

function Home() {
  const [activeFullpageIndex, setActiveFullpageIndex] = useState<number>(0);
  return (
    <div className={styles.container}>
      <FullpageContainer
        activeIndex={activeFullpageIndex}
        setActiveIndex={setActiveFullpageIndex}
        transitionDuration={950}
      >
        <FullpageSection>
          <Masterpiece
            activeFullpageIndex={activeFullpageIndex}
            setActiveFullpageIndex={setActiveFullpageIndex}
          />
        </FullpageSection>
        <FullpageSection>
          <Works />
        </FullpageSection>
        <FullpageSection>
          <Exhibition />
        </FullpageSection>
        <FullpageSection>
          <About />
        </FullpageSection>
        <FullpageSection isAutoHeight>
          <Footer />
        </FullpageSection>
      </FullpageContainer>
    </div>
  );
}

export default Home;
