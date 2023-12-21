import React from 'react';
import { CollaborativeEditor } from '../Editor/CollaborativeEditor';

interface ShowEditorProps {
  fileId: string;
}

const ShowEditor: React.FC<ShowEditorProps> = ({ fileId }) => {
  return <>{fileId && <CollaborativeEditor fileId={fileId} />}</>;
};

export default ShowEditor;
