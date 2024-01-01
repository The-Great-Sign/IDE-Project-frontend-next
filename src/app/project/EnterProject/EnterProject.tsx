'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ModalBackdrop } from '@/components/Modal/Modal.styles';
import {
  EnterProjectAccess,
  EnterProjectClose,
  EnterProjectContainer,
  EnterProjectHeader,
  EnterProjectHead,
  EnterProjectShare,
} from './EnterProject.styles';
import useProjectStore from '@/store/useProjectStore';

interface EnterProps {
  setIsModalOpen: (value: boolean) => void;
}

const EnterProject = ({ setIsModalOpen }: EnterProps) => {
  const router = useRouter();
  const projectId = useProjectStore.getState().currentProject.id;

  const shareURL = async () => {
    await navigator.clipboard
      .writeText(`${process.env.NEXT_PUBLIC_API_BASE_URL}/invite/${projectId}`)
      .then(() => {
        alert('클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      });
  };

  const handleEnter = () => {
    router.push(`/ide/${projectId}`);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <ModalBackdrop>
      <EnterProjectContainer>
        <EnterProjectHeader>
          <EnterProjectClose onClick={handleClose}>x</EnterProjectClose>
        </EnterProjectHeader>
        <EnterProjectHead>생성완료!</EnterProjectHead>
        <EnterProjectShare onClick={shareURL}>
          초대 링크 공유하기
        </EnterProjectShare>
        <EnterProjectAccess type="button" onClick={handleEnter}>
          입장하기
        </EnterProjectAccess>
      </EnterProjectContainer>
    </ModalBackdrop>
  );
};

export default EnterProject;
