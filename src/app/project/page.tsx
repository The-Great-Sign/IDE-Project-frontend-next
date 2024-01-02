'use client';

import MainHeader from '@/components/MainHeader/MainHeader';
import InvitedProject from './InvitedProject';
import MyProject from './MyProject';
import useTokenStore from '@/store/useTokenStore';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProjectPage = () => {
  const router = useRouter();
  const { accessToken } = useTokenStore.getState();

  useEffect(() => {
    if (accessToken) {
      reloadTokenSetting(accessToken);
    } else {
      router.push('/login');
    }
  }, [accessToken, router]);

  return (
    <>
      <MainHeader />
      <MyProject />
      <InvitedProject />
    </>
  );
};

export default ProjectPage;
