import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { FONTS } from '../../constants/fonts';
import { COLORS } from '@/constants/colors';

export const BigButton = styled(Button)`
  width: 25.25rem;
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
    color: black;
  }
  span {
    font-size: ${FONTS.md};
    font-weight: 500;
  }
`;

export const SmallButton = styled(Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  background: ${COLORS.primary};
  color: white;
  font-weight: 500;
  &:last-child {
    background: rgb(212, 218, 250);
    color: black;
    &:hover {
      background: rgb(212, 218, 250, 0.5);
    }
  }
`;
