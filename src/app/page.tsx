'use client';

import MainHeader from '@/components/MainHeader/MainHeader';
import {
  MainContainer,
  MainDiv,
  MainImages,
  MainSubTitle,
  MainTitle,
  InfoBox,
  StartButton,
  MainDivFlexLine,
} from './page.styles';
import { useRouter } from 'next/navigation';
import useTokenStore from '@/store/useTokenStore';
import Image from 'next/image';
import mainImg1 from '@/public/images/main/code-typing-cuate.svg';
import mainImg2 from '@/public/images/main/code-typing-main.svg';
import mainImg3 from '@/public/images/main/code-typing-pana.svg';
import chatGPT from '@/public/images/main/chatGPT-logo.svg';
import { BsChatLeftDots } from 'react-icons/bs';
import { MdEditSquare } from 'react-icons/md';
import { FaPlay } from 'react-icons/fa';
import { useEffect } from 'react';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';

const App = () => {
  const router = useRouter();
  const { isLoggedIn, accessToken } = useTokenStore();

  useEffect(() => {
    if (isLoggedIn && accessToken) {
      reloadTokenSetting(accessToken);
    }
  }, [accessToken, router]);

  const handleClick = () => {
    if (isLoggedIn) {
      router.push(`/project`);
    } else {
      router.push(`/login`);
    }
  };

  return (
    <>
      <MainHeader />
      <MainContainer>
        <MainTitle>DJIDE PROJECT</MainTitle>
        <MainImages>
          <Image src={mainImg1} alt="main-image-1" />
          <Image src={mainImg2} alt="main-image-2" />
          <Image src={mainImg3} alt="main-image-3" />
        </MainImages>

        <MainSubTitle>대박징조 IDE와 함께 하는 페어 코딩</MainSubTitle>
        <MainDiv>
          <MainDivFlexLine>
            <InfoBox>
              <BsChatLeftDots size={26} />
              <p>채팅기능</p>
              <div>텍스트 채팅 가능</div>
            </InfoBox>
            <InfoBox>
              <FaPlay size={24} />
              <p>편리한 코드 실행</p>
              <div>버튼 하나로 실행하는 코드</div>
            </InfoBox>
          </MainDivFlexLine>
          <MainDivFlexLine>
            <InfoBox>
              <MdEditSquare size={27} />
              <p>실시간 동시 편집 가능</p>
              <div>CRDT 활용 실시간 동시 편집</div>
            </InfoBox>
            <InfoBox>
              <Image src={chatGPT} width={26} alt="chatGPT" />
              <p>AI에게 질문</p>
              <div>Chat GPT 활용 간편 코드 리뷰</div>
            </InfoBox>
          </MainDivFlexLine>
        </MainDiv>
        <StartButton onClick={handleClick}>시작하기</StartButton>
      </MainContainer>
    </>
  );
};

export default App;
