'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  EnterProjectAccess,
  // EnterProjectClose,
  EnterProjectContainer,
  EnterProjectHeader,
  EnterProjectShare,
} from './EnterProject.styles';
import useProjectStore from '@/store/useProjectStore';

const EnterProject = () => {
  const router = useRouter();
  const projectId = useProjectStore.getState().currentProject.id;

  const handleEnter = () => {
    router.push(`/ide/${projectId}`);
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
