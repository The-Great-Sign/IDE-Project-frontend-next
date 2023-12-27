'use client';

import MainHeader from '@/components/MainHeader/MainHeader';
import { MainContainer, MainDiv } from './page.styles';
import { BigButton } from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import { InfoBox } from '@/components/InfoBox/InfoBox.styles';
import useTokenStore from '@/store/useTokenStore';

const App = () => {
  const router = useRouter();
  const { isLoggedIn } = useTokenStore();

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
        <h3>
          대박징조 IDE와
          <br />
          함께 하는 페어 코딩
        </h3>
        <div>
          <MainDiv>
            <InfoBox>
              <p>채팅기능</p>
              <div>텍스트 채팅 가능</div>
            </InfoBox>
            <InfoBox>
              <p>편리한 코드 실행</p>
              <div>버튼 하나로 실행하는 코드</div>
            </InfoBox>
            <InfoBox>
              <p>실시간 동시 편집 가능</p>
              <div>CRDT 활용 실시간 동시 편집</div>
            </InfoBox>
            <InfoBox>
              <p>AI에게 질문</p>
              <div>Chat GPT 활용 간편 코드 리뷰</div>
            </InfoBox>
          </MainDiv>
        </div>
        <BigButton onClick={handleClick}>시작하기</BigButton>
      </MainContainer>
    </>
  );
};

export default App;
