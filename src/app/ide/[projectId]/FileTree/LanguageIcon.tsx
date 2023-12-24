import React from 'react';
import { TbBrandPython } from 'react-icons/tb';
import { FaJava, FaHtml5, FaCss3Alt, FaMarkdown } from 'react-icons/fa';
import { SiCplusplus } from 'react-icons/si';
import { IoLogoJavascript } from 'react-icons/io5';
import { AiOutlineFile } from 'react-icons/ai';

interface LanguageIconProps {
  language: string;
}

const LanguageIcon: React.FC<LanguageIconProps> = ({ language }) => {
  switch (language) {
    case 'python':
      return <TbBrandPython size="18px" style={{ margin: '0 2px 0 4px' }} />;
    case 'css':
      return <FaCss3Alt size="18px" style={{ margin: '0 2px 0 4px' }} />;
    case 'c++':
      return <SiCplusplus size="18px" style={{ margin: '0 2px 0 4px' }} />;
    case 'html':
      return <FaHtml5 size="18px" style={{ margin: '0 2px 0 4px' }} />;
    case 'java':
      return <FaJava size="18px" style={{ margin: '0 2px 0 4px' }} />;
    case 'javascript':
      return <IoLogoJavascript size="18px" style={{ margin: '0 2px 0 4px' }} />;
    case 'markdown':
      return <FaMarkdown size="18px" style={{ margin: '0 2px 0 4px' }} />;
    default:
      return <AiOutlineFile size="18px" style={{ margin: '0 2px 0 4px' }} />;
  }
};

export default LanguageIcon;
