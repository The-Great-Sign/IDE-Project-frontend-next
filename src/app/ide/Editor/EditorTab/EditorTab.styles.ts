import { COLORS } from '@/constants/colors';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

export const EditorTabContainer = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  align-items: center;
  border-top: 1px solid ${COLORS.primary};
  border-bottom: 1px solid ${COLORS.primary};
  flex-direction: row;
  justify-content: space-evenly;
  color: ${props => props.theme.colors.text};
`;

export const FileTab = styled.div`
  width: 100%;
  text-align: center;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-right: 1px solid ${COLORS.primary};
  white-space: nowrap;
  &:hover {
    opacity: 50%;
  }
`;

export const FileInfo = styled.div`
  padding-left: 10px;
  font-size: 12px;
`;

export const CloseIcon = styled(AiOutlineClose)`
  cursor: pointer;
  width: 13px;
`;

export const FileClose = styled.div`
  display: flex;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
