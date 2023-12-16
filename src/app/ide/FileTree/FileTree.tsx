import { FileTreeConatiner } from "./FileTree.styles";
import { Tree } from "react-arborist";
import { Node } from "./Node";
import CreateFile from "./CreateFile";
import { Resizable } from "re-resizable";
import { data } from "@/constants/tempFileTreeData";

const FileTree = () => {
  return (
    <Resizable
      defaultSize={{
        width: "300px",
        height: "100%", // 초기 높이 설정
      }}
      enable={{
        top: false, // 위쪽으로만 리사이징 가능
        right: true,
        bottom: false,
        left: false,
        topRight: true,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <FileTreeConatiner>
        <CreateFile />
        <Tree className="react-aborist" data={data}>
          {(nodeProps) => <Node {...nodeProps} />}
        </Tree>
      </FileTreeConatiner>
    </Resizable>
  );
};

export default FileTree;
