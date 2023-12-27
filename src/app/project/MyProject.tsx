import React, { useEffect, useState } from 'react';
import CreateProject from './CreateProject/CreateProject';
import { ContextMenu, ContextMenuButton, ProjectView } from './Project.styles';
import axiosInstance from '../api/axiosInstance';
import {
  EmptyProjectBox,
  MoreIcon,
  MyProjectView,
  ProjectHeader,
  ProjectInfoBox,
} from './Project.styles';
import { MidButton, ProjectEnterButton } from '@/components/Button/Button';
import { IoIosMore } from 'react-icons/io';
import { FaPlay } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import PasswordChangeModal from './PasswordChangeModal/PasswordChangeModal';

interface MyProject {
  id: string;
  name: string;
  programmingLanguage: string;
  description: string;
  updatedAt: string;
}

const MyProject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myProjects, setMyProjects] = useState<MyProject[]>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const fetchProjects = async () => {
    try {
      const response = await axiosInstance.get(`/api/projects/me/created`);
      console.log('My projects:', response.data.results.content);
      setMyProjects(response.data.results.content);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleMoreIconClick = (
    projectId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    console.log(`MoreIcon clicked for project ${projectId}`);
    event.stopPropagation();
    if (selectedProjectId === projectId) {
      setShowOptions(!showOptions); // 이미 선택된 프로젝트일 경우 토글
    } else {
      setShowOptions(true); // 새로운 프로젝트 선택
      setSelectedProjectId(projectId);
    }
  };

  const handlePasswordChangeClick = (projectId: string) => {
    setSelectedProjectId(projectId); // projectId를 selectedProjectId로 설정
    setIsPasswordModalOpen(true); // 비밀번호 변경 모달 열기
    setShowOptions(false); // 컨텍스트 메뉴 닫기
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
      setIsPasswordModalOpen(false); // 모달 닫기
      fetchProjects(); // 프로젝트 목록 업데이트
    } catch (e) {
      console.log('비밀번호 변경에 문제가 발생했습니다.', e);
    }
  };

  const handleProjectDelete = async (projectId: string) => {
    const confirmDelete = window.confirm('프로젝트를 정말 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/api/projects/${projectId}`);
        fetchProjects();
        alert('프로젝트가 성공적으로 삭제되었습니다.');
      } catch (e) {
        console.log('프로젝트 삭제에 문제가 발생했습니다.', e);
      }
    }
  };

  const handleEnterProject = (projectId: string) => {
    router.push(`/ide/${projectId}`);
    console.log(`Enter project ${projectId}`);
  };

  return (
    <ProjectView>
      <ProjectHeader>
        <h2>나의 프로젝트</h2>
        <MidButton onClick={handleClick}>프로젝트 생성</MidButton>
        {isModalOpen && <CreateProject setIsModalOpen={setIsModalOpen} />}
      </ProjectHeader>

      {myProjects.length === 0 ? (
        <EmptyProjectBox>
          <p>텅</p>
        </EmptyProjectBox>
      ) : (
        <MyProjectView>
          {myProjects.map(myProject => (
            <ProjectInfoBox key={myProject.id}>
              <MoreIcon onClick={e => handleMoreIconClick(myProject.id, e)}>
                <IoIosMore />
              </MoreIcon>

              {/* 옵션 모달 */}
              {showOptions && selectedProjectId === myProject.id && (
                <ContextMenu>
                  <ContextMenuButton
                    onClick={() => handlePasswordChangeClick(myProject.id)}
                  >
                    비밀번호 수정
                  </ContextMenuButton>
                  <ContextMenuButton
                    onClick={() => handleProjectDelete(myProject.id)}
                  >
                    프로젝트 삭제
                  </ContextMenuButton>
                </ContextMenu>
              )}

              {/* 기타 정보 - 최근 수정된 날짜 정보 넣기 */}
              <p>{myProject.name}</p>
              <p>{myProject.programmingLanguage}</p>
              <p>{myProject.description}</p>
              <p>{myProject.updatedAt}</p>

              <ProjectEnterButton
                onClick={() => handleEnterProject(myProject.id)}
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

export default MyProject;
