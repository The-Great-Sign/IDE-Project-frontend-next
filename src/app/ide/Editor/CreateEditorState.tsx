import * as Y from 'yjs';
import { yCollab } from 'y-codemirror.next';
import { basicSetup } from 'codemirror';
import { EditorState, Compartment } from '@codemirror/state';
import { LanguageSupport } from '@codemirror/language';
import { python } from '@codemirror/lang-python';
import { markdown } from '@codemirror/lang-markdown';
import { javascript } from '@codemirror/lang-javascript';
import { cpp } from '@codemirror/lang-cpp';
import { html } from '@codemirror/lang-html';
import { json } from '@codemirror/lang-json';
import { java } from '@codemirror/lang-java';
import { css } from '@codemirror/lang-css';
import { TypedLiveblocksProvider } from '@/liveblocks.config';
import { githubLight, githubDark } from '@uiw/codemirror-theme-github';

const yDocs = new Map<string, Y.Doc>();

export const getYDoc = (fileId: string): Y.Doc => {
  let ydoc = yDocs.get(fileId);
  if (!ydoc) {
    ydoc = new Y.Doc();
    yDocs.set(fileId, ydoc);
  }
  return ydoc;
};

export const createEditorState = (
  fileId: string,
  content: string,
  language: string,
  provider: TypedLiveblocksProvider,
  isDarkMode: boolean
): EditorState => {
  const ydoc = getYDoc(fileId);
  const ytext = ydoc.getText('codemirror');

  if (!ytext.toString() && content) {
    ytext.insert(0, content);
  }
  const nowLanguage = new Compartment();
  const themeExtension = isDarkMode ? githubDark : githubLight;

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

  const selectedLanguage = EXTENSIONS[language] || EXTENSIONS['python'];

  const state = EditorState.create({
    doc: ytext.toString(),
    extensions: [
      themeExtension,
      basicSetup,
      nowLanguage.of(selectedLanguage),
      yCollab(ytext, provider.awareness),
    ],
  });
  return state;
};
