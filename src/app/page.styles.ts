import { BigButton } from '@/components/Button/Button';
import { COLORS } from '@/constants/colors';
import { FONTS, FONTS_WEIGHT } from '@/constants/fonts';
import styled from 'styled-components';
const mainPageImageUrl = `/app/mainPageImage.png`;

export const MainTitle = styled.h2`
  font-size: ${FONTS.xl};
  font-weight: ${FONTS_WEIGHT.bold};
  white-space: nowrap;
`;

export const MainSubTitle = styled.h3`
  font-size: ${FONTS.lg};
  margin: 25px;
  font-weight: ${FONTS_WEIGHT.semiBold};
  white-space: nowrap;
`;

export const MainContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px 0 80px 0;
  font-size: ${FONTS.lg};
`;

export const MainImages = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  min-width: 500px;
  max-width: 1100px;

  img {
    width: 30%;
    height: auto;
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    img {
      width: 400px;
    }
    img:first-child,
    img:last-child {
      display: none;
    }
  }
`;

export const MainDiv = styled.div`
  margin: 40px 0;
  display: flex;
  flex-direction: row;
  gap: 15px;
  justify-content: center;
  font-size: ${FONTS.sm};

  flex-wrap: wrap;
`;

export const MainDivFlexLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  text-align: center;
  justify-content: center;
  align-items: center;
  @media (max-width: 600px) {
    flex-direction: column;
  }

  :hover {
    transform: scale(1.1);
    box-shadow: 0 0 5px ${COLORS.primary};
  }
`;

export const InfoBox = styled.div`
  width: auto;
  min-width: 230px;
  max-width: 280px;
  text-align: center; // 텍스트 가운데 정렬
  display: flex;
  flex-direction: column;
  justify-content: center; // 수직 방향으로 가운데 정렬
  align-items: center; // 수평 방향으로 가운데 정렬
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

  p {
    font-size: ${FONTS.md};
    font-weight: ${FONTS_WEIGHT.semiBold};
    white-space: nowrap; // 제목을 한 줄로 표시
    text-overflow: ellipsis; // 텍스트가 넘칠 때 말줄임표 표시
  }

  div {
    white-space: nowrap;
    word-break: keep-all; // 한글 텍스트가 잘리지 않도록 설정
  }

  :hover {
    transform: none;
    box-shadow: none;
  }
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
