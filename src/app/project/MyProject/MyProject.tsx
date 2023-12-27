'use client';

import { useEffect, useState } from 'react';
import CreateProject from '../CreateProject/CreateProject';
import { ProjectView } from '../Project.styles';
import axiosInstance from '../../api/axiosInstance';

const MyProject = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClick = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/me/created`);
        console.log('my project: ', response);
      } catch (e) {
        console.error('프로젝트 로드 중 에러 발생:', e);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectView>
      <div>
        <h2>나의 프로젝트</h2>
        <button type="button" onClick={handleClick}>
          프로젝트 생성
        </button>
        {isModalOpen && <CreateProject setIsModalOpen={setIsModalOpen} />}
      </div>
    </ProjectView>
  );
};

export default MyProject;
