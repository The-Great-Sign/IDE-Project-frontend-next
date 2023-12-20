import { create } from 'zustand';

//현재 열린 파일 목록들
//수정 필요
interface CurrentOpenFileListState {
  isShow: boolean;
  OpenFilesIdList: string[];
  setOpenFilesIdList: (fileId: string) => void;
}
const useCurrentOpenFileList = create<CurrentOpenFileListState>(set => ({
  isShow: true,
  OpenFilesIdList: [],
  setOpenFilesIdList: fileId =>
    set(state => ({
      OpenFilesIdList: state.OpenFilesIdList.concat(fileId),
    })),
}));
export default useCurrentOpenFileList;
