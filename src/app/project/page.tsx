'use client';

import MainHeader from '@/components/MainHeader/MainHeader';
import InvitedProject from './InvitedProject/InvitedProject';
import MyProject from './MyProject/MyProject';

const ProjectPage = () => {
  return (
    <>
      <MainHeader />
      <MyProject />
      <InvitedProject />
    </>
  );
};

export default ProjectPage;
