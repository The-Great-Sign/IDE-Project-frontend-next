import styled from '@emotion/styled';

export const EnterProjectContainer = styled.div`
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
  z-index: 20;
`;

export const EnterProjectHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const EnterProjectClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const EnterProjectHead = styled.h2`
  color: black;
`;

export const EnterProjectShare = styled.button`
  margin-bottom: 20px;
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

export const EnterProjectAccess = styled.button`
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
