import { AiOutlineFolderAdd, AiOutlineFileAdd } from 'react-icons/ai';
import { CreateFileDiv, FileButton } from './FileTree.styles';

const CreateFile = () => {
  return (
    <CreateFileDiv>
      <FileButton>
        <AiOutlineFileAdd size="22px" />
      </FileButton>
      <FileButton>
        <AiOutlineFolderAdd size="22px" />
      </FileButton>
    </CreateFileDiv>
  );
};

export default CreateFile;
