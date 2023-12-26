interface LangSwtichType {
  [key: string]: string;
}

export const findLanguage = (extendsName: string) => {
  const supportLang: LangSwtichType = {
    py: 'python',
    java: 'java',
    html: 'html',
    css: 'css',
    cpp: 'c++',
    js: 'javascript',
    json: 'JSON',
    md: 'markdown',
  };

  const language = supportLang[extendsName];

  return language;
};
