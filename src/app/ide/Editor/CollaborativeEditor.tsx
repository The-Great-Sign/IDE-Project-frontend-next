'use client';

import React, { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';
import LiveblocksProvider from '@liveblocks/yjs';
import { useRoom, useSelf } from '@/liveblocks.config';
import { Editor, EditorContainer } from './CollaborativeEditor.styles';
import { createEditorState } from './CreateEditorState';
import { useFileStore } from '@/store/useFileStore';
import useThemeStore from '@/store/useThemeStore';
interface CollaborativeEditorProps {
  fileId: string;
}

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  fileId,
}) => {
  const { files, updateFileContent } = useFileStore();
  const file = files.find(f => f.id === fileId);
  const room = useRoom();
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf(me => me.info);
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const isDarkMode = useThemeStore(state => state.isDarkMode);
  // const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();

  useEffect(() => {
    if (!file || !editorRef.current || !room || !userInfo) return;

    const ytext = file.yDoc.getText('codemirror');
    // Yjs 변경 이벤트 리스너
    const yTextListener = () => {
      const newContent = ytext.toString();
      updateFileContent(fileId, newContent);
    };

    ytext.observe(yTextListener);
    // const undoManager = new Y.UndoManager(ytext);
    // setYUndoManager(undoManager);

    const provider = new LiveblocksProvider(room, file.yDoc);
    provider.awareness.setLocalStateField('user', {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + '80', // 6-digit hex code at 50% opacity
    });

    if (viewRef.current) {
      viewRef.current.destroy(); // 이전 EditorView 인스턴스 제거
    }

    const state = createEditorState(
      file.id,
      file.content,
      file.language,
      provider,
      isDarkMode
    );

    viewRef.current = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      if (provider) {
        provider.destroy();
      }
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
      if (ytext) ytext.unobserve(yTextListener);
    };
  }, [fileId, isDarkMode, file?.yDoc, updateFileContent, room]);

  if (!file) return null;

  return (
    <EditorContainer>
      {/* <EditorHeader>
        <div>{yUndoManager ? <Undo yUndoManager={yUndoManager} /> : null}</div>
      </EditorHeader> */}
      <Editor ref={editorRef} className="editor-view"></Editor>
    </EditorContainer>
  );
};
