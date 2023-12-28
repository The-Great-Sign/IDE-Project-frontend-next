import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { FONTS, FONTS_WEIGHT } from '@/constants/fonts';
import { COLORS } from '@/constants/colors';

export const BigButton = styled(Button)`
  width: 22rem;
  height: 3.25rem;
  margin: 0.75rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  vertical-align: center;
  background: ${COLORS.primary};
  color: white;
  border-radius: 5px;
  border: none;
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.15),
    0 8px 8px rgba(128, 128, 128, 0.15);

  &:hover {
    background: #2232ea;
  }
  span {
    font-size: ${FONTS.md};
    font-weight: 500;
  }
`;

export const MidButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${COLORS.primary};
  color: white;
  font-weight: 500;
  padding: 11px 23px;
  font-weight: ${FONTS_WEIGHT.medium};
  box-shadow:
    0 1px 1px rgba(128, 128, 128, 0.15),
    0 2px 2px rgba(128, 128, 128, 0.15),
    0 4px 4px rgba(128, 128, 128, 0.15),
    0 8px 8px rgba(128, 128, 128, 0.15);

  &:hover {
    background: #2232ea;
  }
`;
export const SmallButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${COLORS.primary};
  color: white;
  font-weight: ${FONTS_WEIGHT.regular};
  &:hover {
    background: ${COLORS.primary};
    opacity: 0.5;
  }
  &:last-child {
    background: rgb(212, 218, 250);
    color: black;
    &:hover {
      opacity: 0.5;
    }
  }
`;

export const ProjectEnterButton = styled(Button)`
  display: flex;
  gap: 10px;
  cursor: pointer;
  background: ${COLORS.primary};
  color: white;
  font-weight: ${FONTS_WEIGHT.regular};
  height: 2rem;
  padding: 0.3125rem 0.75rem;
  width: 100%;
  &:hover {
    background: #2232ea;
  }
`;

export const ExitBtn = styled(Button)`
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  color: ${COLORS.primary};
  font-weight: 500;
  min-width: 20px;
  width: 20px;
  margin: 0 10px;
  padding: 0 15px;
  white-space: nowrap;
  &:hover {
    color: red;
  }
`;
