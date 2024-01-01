import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed; // 전체 페이지에 걸쳐 고정
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // 반투명 배경
  display: flex;
  align-items: center; // 세로 중앙 정렬
  justify-content: center; // 가로 중앙 정렬
  z-index: 10;
`;
