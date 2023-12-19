import styled from 'styled-components';

export const UndoRedoContainer = styled.div`
  display: flex;
  padding: 1em;
  gap: 6px;
`;

export const UndoRedoBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  height: 20px;
  width: 20px;
  background: #fff;
  color: #1f2937;
  border: none;
  box-shadow:
    rgba(0, 0, 0, 0.12) 0 4px 8px 0,
    rgba(0, 0, 0, 0.02) 0 0 0 1px;

  &:hover {
    color: #111827;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0 5px 8px 0,
      rgba(0, 0, 0, 0.04) 0 0 0 1px;
  }

  &:focus-visible {
    outline-offset: 2px;
  }
`;
