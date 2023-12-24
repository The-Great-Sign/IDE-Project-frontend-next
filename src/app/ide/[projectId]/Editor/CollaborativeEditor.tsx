/* eslint-disable prefer-const */
'use client';

import React, { useEffect, useRef } from 'react';
import { EditorView } from 'codemirror';
import LiveblocksProvider from '@liveblocks/yjs';
import { useRoom, useSelf } from '@/liveblocks.config';
import { Editor, EditorContainer } from './CollaborativeEditor.styles';
import { createEditorState } from './CreateEditorState';
import { useFileStore } from '@/store/useFileStore';

interface CollaborativeEditorProps {
  fileId: string; // fileId prop 추가
}

export const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fileId,
}) => {
  const { files } = useFileStore();
  const file = files.find(f => f.id === fileId);
  const room = useRoom();
  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf(me => me.info);
  const editorRef = useRef<HTMLDivElement>(null);

  // const [editorContent, setEditorContent] = useState('');
  // const [element, setElement] = useState<HTMLElement>();

  // const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();

  // const ref = useCallback((node: HTMLElement | null) => {
  //   if (!node) return;
  //   setElement(node);
  // }, []);

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {
    if (!file || !editorRef.current || !room || !userInfo) return;

    const provider = new LiveblocksProvider(room, file.yDoc);

    // Define a shared text type on the document

    // let ydoc: Y.Doc;
    // let view: EditorView;
    // let language = new Compartment();

    // Create Yjs provider and document - A Yjs document holds the shared data
    // ydoc = new Y.Doc();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // provider = new LiveblocksProvider(room as any, ydoc);
    // Define a shared text type on the document
    // const ytext = ydoc.getText('codemirror');
    // const undoManager = new Y.UndoManager(ytext);
    // setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField('user', {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + '80', // 6-digit hex code at 50% opacity
    });

    const state = createEditorState(
      file.id,
      file.content,
      file.language,
      provider
    );

    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    return () => {
      provider.destroy();
      view.destroy();
    };
  }, [file, fileId, files, room, userInfo]);

  if (!file) return null;

  // useEffect(() => {
  //   console.log(editorContent)
  // }, [editorContent]);

  return (
    <EditorContainer>
      {/* <EditorHeader>
        <div>{yUndoManager ? <Undo yUndoManager={yUndoManager} /> : null}</div>
      </EditorHeader> */}
      <Editor ref={editorRef} className="editor-view"></Editor>
    </EditorContainer>
  );
};
