import styled from '@emotion/styled';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const EditorHeader = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Editor = styled.div`
  position: relative;
  flex-grow: 1;
  overflow: auto;
`;
