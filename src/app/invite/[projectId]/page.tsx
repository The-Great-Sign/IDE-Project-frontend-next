'use client';
import React, { useEffect } from 'react';
import {
  IDETitle,
  InviteContainer,
  InviteEnterButton,
  InviteForm,
  InvitePage,
  InvitePasswordInput,
  InvitePasswordTitle,
  InviteTitle,
} from './Invite.styles';
import { getCurrentProjectId } from '@/app/ide/[projectId]/page';
import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import useUserStore from '@/store/useUserStore';

interface EnterProps {
  password: string;
  projectId: string;
}

const Invite = () => {
  const router = useRouter();
  const [password, setPassword] = React.useState<string>('');

  const postEnterProject = async (enterData: EnterProps) => {
    try {
      const response = await axiosInstance.post('/api/projects', enterData);
      const data = response.data;
      if (data.success) {
        ///////// 결과값이 200? 400?
        console.log(data.message);
        router.push(`/ide/${getCurrentProjectId()}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enterData = {
      password: password,
      projectId: getCurrentProjectId(),
    };
    postEnterProject(enterData);
  };

  useEffect(() => {
    if (useUserStore.getState().isLoggedIn == false) {
      useProjectStore.getState().setInvitedProjectId(getCurrentProjectId());
      router.push('/login');
    }
  }, []);

  return (
    <InvitePage>
      <InviteContainer>
        <IDETitle>DJIDE</IDETitle>
        <InviteTitle>닉네임님의 프로젝트명 초대 링크</InviteTitle>
        <InvitePasswordTitle>비밀번호</InvitePasswordTitle>
        <InviteForm onSubmit={handleSubmit}>
          <InvitePasswordInput type="password" onChange={handleInput} />
          <InviteEnterButton type="submit">입장하기</InviteEnterButton>
        </InviteForm>
      </InviteContainer>
    </InvitePage>
  );
};

export default Invite;
