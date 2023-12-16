/* eslint-disable prefer-const */
'use client';

import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { python } from '@codemirror/lang-python';
// import { javascript } from '@codemirror/lang-javascript';
import { useCallback, useEffect, useState } from 'react';
import LiveblocksProvider from '@liveblocks/yjs';
import { TypedLiveblocksProvider, useRoom, useSelf } from '@/liveblocks.config';
import styles from './CollaborativeEditor.module.css';
import { Avatars } from '@/app/ide/Editor/Avatars';
import { Undo } from '@/app/ide/Editor/Undo';
import { materialDark } from 'cm6-theme-material-dark';

// Collaborative code editor with undo/redo, live cursors, and live avatars
export function CollaborativeEditor() {
  const room = useRoom();
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf(me => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {
    let provider: TypedLiveblocksProvider;
    let ydoc: Y.Doc;
    let view: EditorView;

    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    // eslint-disable-next-line prefer-const
    ydoc = new Y.Doc();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider = new LiveblocksProvider(room as any, ydoc);
    const ytext = ydoc.getText('codemirror');
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField('user', {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + '80', // 6-digit hex code at 50% opacity
    });

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        python(),
        // javascript(),
        yCollab(ytext, provider.awareness, { undoManager }),
        materialDark,
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
  }, [element, room, userInfo]);

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <div>{yUndoManager ? <Undo yUndoManager={yUndoManager} /> : null}</div>
        <Avatars />
      </div>
      <div className={styles.editorContainer} ref={ref}></div>
    </div>
  );
}
