import { useEffect } from 'react';
import { ProjectView } from '../Project.styles';
import axiosInstance from '../../api/axiosInstance';

const InvitedProject = () => {
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get(`/api/projects/me/joined`);
        console.log('joined response: ', response);
      } catch (e) {
        console.error('프로젝트 로드 중 에러 발생:', e);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ProjectView>
      <div>
        <h2>초대받은 프로젝트</h2>
      </div>
    </ProjectView>
  );
};

export default InvitedProject;
