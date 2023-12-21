'use client';

import MainHeader from '@/components/MainHeader/MainHeader';
import { MainContainer } from './page.styles';
// import ThemeToggleBtn from '@/components/ThemeToggleBtn/ThemeToggleBtn';

const App = () => {
  return (
    <>
      <MainHeader />
      <MainContainer>
        <h2>대박징조 DJIDE PROJECT</h2>
        {/* <ThemeToggleBtn /> */}
      </MainContainer>
    </>
  );
};

export default App;
