import styled from 'styled-components';

export const InvitePage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  max-width: 600px;
  height: auto;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 15px 20px;
  box-sizing: border-box;
  z-index: 1000;
`;

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
`;

export const IDETitle = styled.h1`
  color: black;
`;

export const InviteTitle = styled.div`
  color: black;
  padding-bottom: 20px;
`;
export const IDEContentContainer = styled.div``;
export const InviteForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding-bottom: 40px;
  align-items: stretch;
  justify-content: center;
`;
export const InvitePasswordInput = styled.input`
  padding: 12px 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.05);
`;
export const InviteEnterButton = styled.button`
  padding: 12px 20px;
  margin-bottom: 20px;
  background-color: #404eed;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;
