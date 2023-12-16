"use client";

import MainHeader from "@/components/MainHeader/MainHeader";
import InvitedProject from "./InvitedProject";
import MyProject from "./MyProject";

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
