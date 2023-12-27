import styled from 'styled-components';
import { FONTS } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';

export const FileTreeConatiner = styled.div`
  width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  padding: 15px 20px;
  border-top: 1px solid ${COLORS.primary};

  border-left: 1px solid ${COLORS.primary};
  align-items: center;
  height: calc(100vh - 51px);
  overflow: hidden;
`;

export const NodeContainer = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  font-size: ${FONTS.sm};

  cursor: pointer;

  .file-actions {
    display: none;
  }

  .file-actions button {
    border: none;
    margin-right: 5px;
    background: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }

  &:hover .file-actions {
    display: block;
  }

  .file-actions button {
    color: ${COLORS.primary};
  }

  .node-text {
    margin: 0px 2px;
  }
`;
interface FileDivProps {
  isNodeDirty?: boolean;
}
export const FileDiv = styled.div<FileDivProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${props => (props.isNodeDirty ? 'red' : '')};
`;

// 파일 생성

export const CreateFileDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
`;

export const FileButton = styled.button`
  border: none;
  background: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 5px;
  color: ${COLORS.primary};

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

export const IsDirty = styled.div`
  margin-left: 4px;
  width: 7px;
  height: 7px;
  background: red;
  border-radius: 50%;
  display: inline;
`;

export const IsNotDirty = styled(IsDirty)`
  background: none;
`;
