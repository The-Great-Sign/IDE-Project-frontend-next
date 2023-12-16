import { Resizable } from 're-resizable';
import { TerminalContainer} from './TerminalTest.style';

const TerminalTest = () => {
  return (
    <Resizable
      defaultSize={{
        height: '300px', // 초기 높이 설정
        width: '100%', 
      }}
      enable={{
        top: true, // 위쪽으로만 리사이징 가능
        right: false,
        bottom: true,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
      >
      <TerminalContainer>
        Terminal Test
        {/* <Terminal/> */}
      </TerminalContainer>
    </Resizable>
  );
};

export default TerminalTest;
