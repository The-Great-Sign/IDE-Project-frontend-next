import React from 'react';
import { CollaborativeEditor } from '../Editor/CollaborativeEditor';
import { Room } from '@/app/ide/Room';
import CurrentUser from '../Header/CurrentUser';

interface ShowEditorProps {
  fileId: string;
}

const ShowEditor: React.FC<ShowEditorProps> = React.memo(({ fileId }) => {
  return (
    <Room roomId={fileId}>
      <CurrentUser />
      <CollaborativeEditor fileId={fileId} />
    </Room>
  );
});

ShowEditor.displayName = 'ShowEditor';
export default ShowEditor;
