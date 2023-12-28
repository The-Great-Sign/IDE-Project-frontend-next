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

  useEffect(() => {
    const storedAccessToken = useTokenStore.getState().accessToken;
    if (storedAccessToken) {
      reloadTokenSetting(storedAccessToken);
    } else {
      router.push(`/`);
    }
  }, []);
  return (
    <>
      <MainHeader />
      <MyProject />
      <InvitedProject />
    </>
  );
};

export default ProjectPage;
