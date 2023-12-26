import styled from '@emotion/styled';

export const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  overflow: hidden;
`;

export const EditorHeader = styled.div`
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Editor = styled.div`
  height: 100%;
  position: relative;
  flex-grow: 1;
  overflow: auto;
`;
