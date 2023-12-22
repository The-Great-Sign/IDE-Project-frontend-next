import Image from 'next/image';
import styled from 'styled-components';

export const Avatars = styled.div`
  display: flex;
  padding: 0 0.75rem;
`;
export const AvatarDiv = styled.div`
  display: flex;
  place-content: center;
  position: relative;
  border-radius: 30px;
  width: 26px;
  height: 26px;
  background-color: #9ca3af;
  margin-left: -0.75rem;

  &:before {
    content: attr(data-tooltip);
    position: absolute;
    top: 100%;
    opacity: 0;
    transition: opacity 0.15s ease;
    padding: 5px 10px;
    color: white;
    font-size: 0.75rem;
    border-radius: 8px;
    margin-top: 10px;
    z-index: 1;
    background: black;
    white-space: nowrap;
  }

  &:hover:before {
    opacity: 1;
  }
`;

export const AvatarImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 9999px;
`;
