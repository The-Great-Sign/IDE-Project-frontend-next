import { FONTS, FONTS_WEIGHT } from '@/constants/fonts';
import styled from 'styled-components';

export const InfoBox = styled.div`
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

  p {
    font-size: ${FONTS.sm};
    font-weight: ${FONTS_WEIGHT.semiBold};
    margin: 10px 0;
    white-space: nowrap; // 제목을 한 줄로 표시
    overflow: hidden; // 넘치는 텍스트 숨김
    text-overflow: ellipsis; // 텍스트가 넘칠 때 말줄임표 표시
  }

  div {
    white-space: nowrap;
    word-break: keep-all; // 한글 텍스트가 잘리지 않도록 설정
    overflow: hidden; // 넘치는 텍스트 숨김
    /* text-overflow: ellipsis; */
  }
`;
