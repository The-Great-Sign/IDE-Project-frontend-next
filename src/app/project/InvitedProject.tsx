import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import {
  EmptyProjectBox,
  EmptyView,
  MoreIcon,
  MyProjectView,
  ProjectHeader,
  ProjectInfoBox,
  ProjectView,
} from './Project.styles';
import { ProjectEnterButton } from '@/components/Button/Button';
import { IoIosMore } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import PasswordChangeModal from './PasswordChangeModal/PasswordChangeModal';
import { formatDateString } from '@/utils/formatDataString';

interface InvitedProject {
  id: string;
  name: string;
  programmingLanguage: string;
  description: string;
  updatedAt: string;
}

const InvitedProject = () => {
  const [invitedProjects, setInvitedProjects] = useState<InvitedProject[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(`/api/projects/me/joined`);
      console.log('Invited projects:', response.data.results.content);
      setInvitedProjects(response.data.results.content);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleMoreIconClick = (
    projectId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log(`MoreIcon clicked for project ${projectId}`);
    event.stopPropagation();
    if (selectedProjectId === projectId) {
      setShowOptions(!showOptions);
    } else {
      setShowOptions(true);
      setSelectedProjectId(projectId);
    }
  };

  const handlePasswordChangeSubmit = async (newPassword: string) => {
    if (newPassword.length < 4) {
      alert('비밀번호를 4자 이상 입력해주세요.');
      return;
    } else if (newPassword.length > 10) {
      alert('비밀번호를 10자 이하로 입력해주세요.');
      return;
    }
    try {
      await axiosInstance.patch(
        `/api/projects/${selectedProjectId}/new-password`,
        { password: newPassword }
      );
      alert('비밀번호가 성공적으로 변경되었습니다.');
      setIsPasswordModalOpen(false);
      fetchProjects();
    } catch (e) {
      console.log('비밀번호 변경에 문제가 발생했습니다.', e);
    }
  };

  const handleEnterProject = (projectId: string) => {
    router.push(`/ide/${projectId}`);
    console.log(`Enter project ${projectId}`);
  };

  return (
    <ProjectView>
      <ProjectHeader>
        <h2>초대받은 프로젝트</h2>
      </ProjectHeader>

      {invitedProjects.length === 0 ? (
        <EmptyProjectBox>
          <EmptyView>텅</EmptyView>
        </EmptyProjectBox>
      ) : (
        <MyProjectView>
          {invitedProjects.map(invitedProject => (
            <ProjectInfoBox key={invitedProject.id}>
              <MoreIcon
                onClick={e => handleMoreIconClick(invitedProject.id, e)}
              >
                <IoIosMore />
              </MoreIcon>
              <p>{invitedProject.name}</p>
              <p>{invitedProject.programmingLanguage}</p>
              <p>{invitedProject.description}</p>
              <p>{formatDateString(invitedProject.updatedAt)}에 수정됨</p>

              <ProjectEnterButton
                onClick={() => handleEnterProject(invitedProject.id)}
              >
                <FaPlay /> 입장하기
              </ProjectEnterButton>
            </ProjectInfoBox>
          ))}
        </MyProjectView>
      )}
      {isPasswordModalOpen && (
        <PasswordChangeModal
          projectId={selectedProjectId}
          onSubmit={handlePasswordChangeSubmit}
          onClose={() => setIsPasswordModalOpen(false)}
        />
      )}
    </ProjectView>
  );
};

export default InvitedProject;
