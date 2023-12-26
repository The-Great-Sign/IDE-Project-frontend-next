'use client';
import { useState } from 'react';
import CreateProject from './CreateProject/CreateProject';
import { ProjectView } from './Project.styles';

const MyProject = () => {
  const [isCreate, setIsCreate] = useState(false);
  const handleClick = () => {
    setIsCreate(true);
  };

  return (
    <ProjectView>
      <div>
        <h2>나의 프로젝트</h2>
        <button type="button" onClick={handleClick}>
          프로젝트 생성
        </button>
        {isCreate && <CreateProject />}
      </div>
    </ProjectView>
  );
};

export default MyProject;
