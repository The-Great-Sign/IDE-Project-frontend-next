import styled from 'styled-components';

export const CreateProjectContainer = styled.div`
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

export const CreateProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 95%;
  padding-bottom: 20px;
  background-color: white;
  color: black;
`;

export const CreateProjectHead = styled.h4`
  margin: 0;
`;

export const CreateProjectClose = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
`;

export const CreateProjectForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding-bottom: 40px;
  align-items: stretch;
  justify-content: center;
`;

export const CreateProjectInputTitle = styled.label`
  text-align: left;
  font-weight: bold;
  margin-bottom: 8px;
  color: #333;
`;

export const CreateProjectLanguage = styled.select`
  padding: 12px 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.05);
`;

export const CreateProjectInput = styled.input`
  padding: 12px 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.05);
`;

export const CreateProjectDescription = styled.textarea`
  padding: 12px 8px;
  border: 1px solid #c0b0b0;
  border-radius: 10px;
  resize: none;
  height: 100px;
  margin-bottom: 20px;
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.05);
`;

export const CreateProjectButton = styled.button`
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
