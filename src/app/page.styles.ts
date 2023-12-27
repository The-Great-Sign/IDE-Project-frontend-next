import { BigButton } from '@/components/Button/Button';
import { FONTS } from '@/constants/fonts';
import styled from 'styled-components';
const mainPageImageUrl = `/app/mainPageImage.png`;

export const MainContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  padding-top: 50px;
  font-size: ${FONTS.md};
`;

export const MainDiv = styled.div`
  text-align: center;
  display: flex;
  gap: 10px;
  font-size: 0.5em; // 텍스트 크기가 너무 크면 조절
  justify-content: center;
  width: 100%; // 원하는 가로 길이로 설정
  margin: 0 auto; // 가로 중앙 정렬을 위해 자동 마진 사용
  padding-top: 5vw;
  padding-bottom: 5vw;
  text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
  overflow: hidden; // 텍스트가 넘칠 경우 숨김
`;

export const MainPageImage = styled.div`
  background-image: url(${mainPageImageUrl});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%; // 이 값을 적절한 크기로 조정
  height: 400px; // 배경 이미지가 보일 수 있도록 높이를 지정
  overflow: hidden; // 이미지가 넘칠 경우 숨김
`;

export const MainDivInfo = styled.div`
  text-align: center; // 텍스트 가운데 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 방향으로 가운데 정렬
  align-items: center; // 수평 방향으로 가운데 정렬
  width: 18%; // 필요에 따라 너비 조정
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.1em;
    margin: 10px 0;
    white-space: nowrap; // 제목을 한 줄로 표시
    overflow: hidden; // 넘치는 텍스트 숨김
    text-overflow: ellipsis; // 텍스트가 넘칠 때 말줄임표 표시
  }

  div {
    word-break: keep-all; // 한글 텍스트가 잘리지 않도록 설정
    overflow: hidden; // 넘치는 텍스트 숨김
    text-overflow: ellipsis; // 텍스트가 넘칠 때 말줄임표 표시
  }
`;

export const StartButton = styled(BigButton)`
  font-size: 20px !important;
`;
