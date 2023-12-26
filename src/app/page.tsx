'use client';

import MainHeader from '@/components/MainHeader/MainHeader';
import { MainContainer, MainDiv, MainDivInfo } from './page.styles';
import { BigButton } from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import useUserStore from '@/store/useUserStore';
// import Image from 'next/image';

const App = () => {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();

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
        <h2>대박징조 DJIDE PROJECT</h2>
        <h2>
          대징 IDE와
          <br />
          함께 하는 페어 코딩
        </h2>
        <div>
          {/* <Image
            src="/public/images/meeting_mono.png"
            alt="메인이미지"
            width={400} // 실제 이미지의 너비
            height={200}
            layout="responsive"
          /> */}
          <MainDiv>
            <MainDivInfo>
              <h2>채팅기능</h2>
              <div>텍스트 채팅 가능</div>
            </MainDivInfo>
            <MainDivInfo>
              <h2>편리한 코드 실행</h2>
              <div>버튼 하나로 실행하는 코드</div>
            </MainDivInfo>
            <MainDivInfo>
              <h2>실시간 동시 편집 가능</h2>
              <div>CRDT 활용 실시간 동시 편집</div>
            </MainDivInfo>
            <MainDivInfo>
              <h2>AI에게 질문</h2>
              <div>Chat GPT 활용 간편 코드 리뷰</div>
            </MainDivInfo>
          </MainDiv>
        </div>
        <BigButton onClick={handleClick}>시작하기</BigButton>
      </MainContainer>
    </>
  );
};

export default App;
