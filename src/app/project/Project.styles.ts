import { COLORS } from '@/constants/colors';
import { FONTS, FONTS_WEIGHT } from '@/constants/fonts';
import styled from 'styled-components';

export const ProjectView = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 30px;
  width: 92%;
`;

export const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 30px;
  align-items: center;
  width: 92%;
  margin-top: 30px;
`;

export const MyProjectView = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 60px;
  padding: 0 20px;
  justify-content: start;
`;

export const EmptyView = styled.h1`
  font-size: 100px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 0 auto;
  width: 100%;
`;

export const EmptyProjectBox = styled(Box)`
  margin: 30px;
  width: 90%;
  height: 300px;
  padding: 0;
  margin-right: 50px;
  font-weight: ${FONTS_WEIGHT.medium};
  box-shadow: ${PROPS => PROPS.theme.colors.boxShadow};
  border-radius: 10px;
`;

export const ProjectInfoBox = styled(Box)`
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;

  p {
    font-size: ${FONTS.sm};
    font-weight: ${FONTS_WEIGHT.medium};
    margin: 10px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:first-child {
      color: ${COLORS.primary};
      font-weight: ${FONTS_WEIGHT.semiBold};
    }
  }
`;

export const MoreIcon = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const ContextMenu = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  background-color: ${PROPS => PROPS.theme.colors.bg};
  border-radius: 5px;
  box-shadow: ${PROPS => PROPS.theme.colors.boxShadow};
  z-index: 1;
  display: flex;
  flex-direction: column;
`;

export const ContextMenuButton = styled.button`
  padding: 10px 15px;
  border: none;
  background: none;
  text-align: left;
  width: 100%;
  color: ${PROPS => PROPS.theme.colors.text};
  cursor: pointer;

  &:hover {
    background-color: ${PROPS => PROPS.theme.colors.menuHover};
  }

  &:first-child:hover {
    border-radius: 5px 5px 0 0;
  }

  &:last-child:hover {
    border-radius: 0 0 5px 5px;
  }
`;
