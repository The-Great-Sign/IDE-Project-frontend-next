import styled from 'styled-components';

export const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 48px;
  height: calc(100vh - 50px);
  padding-bottom: 400px;
`;

export const ToolBarIconDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
  height: 50px;
  cursor: pointer;
  box-sizing: border-box;
  border-left: 2px solid transparent;

  &:hover {
    border-left-color: #002884;
  }
`;

export const ToolBarUserDiv = styled(ToolBarIconDiv)`
  &:hover {
    border-left-color: transparent;
  }
`;

export const ToolBarMenuDiv = styled(ToolBarIconDiv)`
  height: 40px;
  &:hover {
    border-left-color: transparent;
  }
`;
export const Div = styled.div`
  width: 100%;
  height: max-content;
  margin: 0;
`;
