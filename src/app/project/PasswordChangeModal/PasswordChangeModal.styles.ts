import styled from 'styled-components';

export const PasswordChangeModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 40vw; // 너비 조정
  max-width: 500px; // 최대 너비 제한
  height: auto;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  z-index: 20;
`;

export const PasswordChangeModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6); // 배경 색상 조정
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PasswordChangeModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const PasswordChangeModalTitle = styled.h4`
  margin: 0;
`;

export const PasswordChangeModalClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const PasswordChangeModalForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: stretch;
`;

export const PasswordChangeModalInput = styled.input`
  padding: 12px 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const PasswordChangeModalButton = styled.button`
  padding: 12px 20px;
  background-color: #404eed;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #2232ea;
  }
`;
