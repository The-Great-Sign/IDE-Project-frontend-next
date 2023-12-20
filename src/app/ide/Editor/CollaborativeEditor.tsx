/* eslint-disable prefer-const */
'use client';

import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
import { useCallback, useEffect, useState } from 'react';
import LiveblocksProvider from '@liveblocks/yjs';
import { TypedLiveblocksProvider, useRoom, useSelf } from '@/liveblocks.config';
// import { Undo } from '@/app/ide/Editor/Undo';
import { materialDark } from 'cm6-theme-material-dark';
import {
  Editor,
  EditorContainer,
  // EditorHeader,
  EditorTab,
  FileClose,
  FileInfo,
  FileTab,
} from './CollaborativeEditor.styles';
import { LanguageSupport } from '@codemirror/language';
import { markdown } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { java } from '@codemirror/lang-java';
import { css } from '@codemirror/lang-css';
// import useCurrentOpenFile from '@/store/useCurrentOpenFile';

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [editorContent, setEditorContent] = useState('');
  const [element, setElement] = useState<HTMLElement>();

  // const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf(me => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  // 파일 클릭시 코드 내용과 언어 정보 받기
  // const { content, language } = useCurrentOpenFile();

  // 언어 변경시 상태 바꾸기
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentLanguage, setCurrentlanguage] = useState('python');

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {
    if (!element || !room || !userInfo) {
      return;
    }

    let provider: TypedLiveblocksProvider;
    let ydoc: Y.Doc;
    let view: EditorView;
    let language = new Compartment();

    // Create Yjs provider and document - A Yjs document holds the shared data
    ydoc = new Y.Doc();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider = new LiveblocksProvider(room as any, ydoc);
    // Define a shared text type on the document
    const ytext = ydoc.getText('codemirror');
    const undoManager = new Y.UndoManager(ytext);
    // setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField('user', {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + '80', // 6-digit hex code at 50% opacity
    });

    const EXTENSIONS: { [key: string]: LanguageSupport } = {
      python: python(),
      javascript: javascript(),
      typescript: javascript({ typescript: true }),
      jsx: javascript({ jsx: true }),
      tsx: javascript({ jsx: true, typescript: true }),
      'c++': cpp(),
      java: java(),
      html: html(),
      css: css(),
      markdown: markdown(),
      json: json(),
    };

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        language.of(EXTENSIONS[currentLanguage]),
        yCollab(ytext, provider.awareness, { undoManager }),
        materialDark,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            const newContent = update.state.doc.toString();
            setEditorContent(newContent);
          }
        }),
      ],
    });

    // Attach CodeMirror to element
    view = new EditorView({
      state,
      parent: element,
    });

    return () => {
      ydoc?.destroy();
      provider?.destroy();
      view?.destroy();
    };
  }, [element, room, userInfo, currentLanguage]);

  useEffect(() => {
    console.log(editorContent); // 상태 값이 변경될 때마다 콘솔에 출력
  }, [editorContent]);
  // const handleDocChange = (newContent: string) => {
  //   // 새로운 내용을 상태에 저장
  //   // 여기서 상태 업데이트가 발생해도 useEffect가 재실행되지 않음
  //   console.log(newContent); // 새로운 내용 로깅
  // };

  return (
    <EditorContainer>
      {/* <EditorHeader>
        <div>{yUndoManager ? <Undo yUndoManager={yUndoManager} /> : null}</div>
      </EditorHeader> */}
      <EditorTab>
        <FileTab>
          <FileInfo>현재 열린 파일.py</FileInfo>
          <FileClose>x</FileClose>
        </FileTab>
      </EditorTab>
      <Editor ref={ref}></Editor>
    </EditorContainer>
  );
}
