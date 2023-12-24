import { COLORS } from '@/constants/colors';
import { ThreeDots } from 'react-loader-spinner';
import { LoadingDiv } from './Loading.styles';
export function Loading() {
  return (
    <LoadingDiv>
      <ThreeDots
        visible={true}
        height="60"
        width="60"
        color={`${COLORS.primary}`}
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoadingDiv>
  );
}
