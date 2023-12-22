'use client';
import React from 'react';
import useProjectStore from '@/store/useProjectStore';
import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';
import {
  EnterProjectAccess,
  // EnterProjectClose,
  EnterProjectContainer,
  EnterProjectHeader,
  EnterProjectShare,
} from './EnterProject.styles';

const EnterProject = () => {
  const router = useRouter();
  const currentProject = useProjectStore.getState().currentProject;
  const projectId = currentProject.id;

  const postEnterProject = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/projects/${projectId}/run`
      );
      const data = response.data;
      useProjectStore.getState().setStatus(data.results);
      if (data.success) {
        router.push('/ide');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEnter = () => {
    postEnterProject();
  };

  return (
    <EnterProjectContainer>
      {/* <EnterProjectClose /> */}
      <EnterProjectHeader>생성완료!</EnterProjectHeader>
      <EnterProjectShare>초대 링크 공유하기</EnterProjectShare>
      <EnterProjectAccess type="button" onClick={handleEnter}>
        입장하기
      </EnterProjectAccess>
    </EnterProjectContainer>
  );
};

export default EnterProject;
