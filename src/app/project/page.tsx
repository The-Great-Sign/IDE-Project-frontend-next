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
  const storedAccessToken = useTokenStore.getState().accessToken;

  useEffect(() => {
    if (storedAccessToken && useTokenStore.getState().isLoggedIn) {
      reloadTokenSetting(storedAccessToken);
    } else {
      router.push('/login');
    }
  }, [storedAccessToken, router]);
  return (
    <>
      <MainHeader />
      <MyProject />
      <InvitedProject />
    </>
  );
};

export default ProjectPage;
