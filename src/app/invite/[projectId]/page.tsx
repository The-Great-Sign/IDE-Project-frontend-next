'use client';
import React, { useEffect, useState } from 'react';
import {
  IDETitle,
  InviteContainer,
  IDEContentContainer,
  InviteEnterButton,
  InviteForm,
  InvitePage,
  InvitePasswordInput,
  InviteTitle,
  ModalBackdrop,
} from './Invite.styles';
import { getCurrentProjectId } from '@/app/ide/[projectId]/page';
import axiosInstance from '@/app/api/axiosInstance';
import { useRouter } from 'next/navigation';
import useProjectStore from '@/store/useProjectStore';
import useTokenStore from '@/store/useTokenStore';
import { reloadTokenSetting } from '@/utils/token/reloadTokenSetting';
import axios from 'axios';

interface EnterProps {
  password: string;
  projectId: string;
}

const Invite = () => {
  const router = useRouter();
  const [projectName, setProjectName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const getProjectName = async () => {
    try {
      const response = await axios.get(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URI
        }/api/projects/${getCurrentProjectId()}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: localStorage.getItem('accessToken'),
          },
        }
      );
      const data = response.data;
      if (data.success) {
        setProjectName(data.results.name);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const postEnterProject = async (enterData: EnterProps) => {
    try {
      const response = await axiosInstance.post('/api/projects', enterData);
      const data = response.data;
      if (data.success) {
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
    getProjectName();
    //로그인 여부 확인
    const storedAccessToken = useTokenStore.getState().accessToken;
    if (storedAccessToken) {
      //로그인 된 사용자라면 다시 invite로 비밀번호 입력하도록
      reloadTokenSetting(storedAccessToken);
    } else {
      localStorage.setItem('invitedProjectId', getCurrentProjectId());
      router.push(`/login`);
    }
    if (useTokenStore.getState().isLoggedIn == false) {
      useProjectStore.getState().setInvitedProjectId(getCurrentProjectId());
      router.push('/login');
    }
  }, []);

  return (
    <InvitePage>
      <ModalBackdrop>
        <InviteContainer>
          <IDETitle>DJIDE</IDETitle>
          <IDEContentContainer>
            <InviteTitle>
              <strong>{projectName} </strong>
            </InviteTitle>
          </IDEContentContainer>
          <InviteForm onSubmit={handleSubmit}>
            <InvitePasswordInput
              placeholder="비밀번호를 입력하세요"
              type="password"
              onChange={handleInput}
            />
            <InviteEnterButton type="submit">입장하기</InviteEnterButton>
          </InviteForm>
        </InviteContainer>
      </ModalBackdrop>
    </InvitePage>
  );
};

export default Invite;

// 'use client';
// import React, { useEffect } from 'react';
// import {
//   IDETitle,
//   InviteContainer,
//   InviteEnterButton,
//   InviteForm,
//   InvitePage,
//   InvitePasswordInput,
//   InvitePasswordTitle,
//   InviteTitle,
// } from './Invite.styles';
// import { getCurrentProjectId } from '@/app/ide/[projectId]/page';
// import axiosInstance from '@/app/api/axiosInstance';
// import { useRouter } from 'next/navigation';
// import useProjectStore from '@/store/useProjectStore';
// import useUserStore from '@/store/useUserStore';

// interface EnterProps {
//   password: string;
//   projectId: string;
// }

// const Invite = () => {
//   const router = useRouter();
//   const [password, setPassword] = React.useState<string>('');

//   const postProjectName = async () => {
//     try {
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/projects/${getCurrentProjectId()}`,
//         {},
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             Authorization: localStorage.getItem('accessToken'),
//           },
//         }
//       );
//       const data = response.data;
//       if (data.success) {
//         useAIChatStore.getState().addAIMessage(data);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const postEnterProject = async (projectId: string) => {
//     try {
//       console.log(localStorage.getItem('accessToken'));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/projects/${projectId}/run`,
//         {},

//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             Authorization: localStorage.getItem('accessToken'),
//           },
//         }
//       );
//       console.log(localStorage.getItem('accessToken'));
//       const data = response.data;
//       setExecute(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const postEnterProject = async (enterData: EnterProps) => {
//     try {
//       const response = await axiosInstance.post('/api/projects', enterData);
//       const data = response.data;
//       if (data.success) {
//         console.log(data.message);
//         router.push(`/ide/${getCurrentProjectId()}`);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const postEnterProject = async (projectId: string) => {
//     try {
//       console.log(localStorage.getItem('accessToken'));
//       const response = await axios.post(
//         `${process.env.NEXT_PUBLIC_BACKEND_URI}/api/projects/${projectId}/run`,
//         {},

//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             Authorization: localStorage.getItem('accessToken'),
//           },
//         }
//       );
//       console.log(localStorage.getItem('accessToken'));
//       const data = response.data;
//       setExecute(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };
//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const enterData = {
//       password: password,
//       projectId: getCurrentProjectId(),
//     };
//     postEnterProject(enterData);
//   };

//   useEffect(() => {
//     if (useUserStore.getState().isLoggedIn == false) {
//       useProjectStore.getState().setInvitedProjectId(getCurrentProjectId());
//       router.push('/login');
//     }
//     else{
//       postProjectName();
//     }
//   }, []);

//   return (
//     <InvitePage>
//       <InviteContainer>
//         <IDETitle>DJIDE</IDETitle>
//         <InviteTitle>닉네임님의 프로젝트명 초대 링크</InviteTitle>
//         <InvitePasswordTitle>비밀번호</InvitePasswordTitle>
//         <InviteForm onSubmit={handleSubmit}>
//           <InvitePasswordInput type="password" onChange={handleInput} />
//           <InviteEnterButton type="submit">입장하기</InviteEnterButton>
//         </InviteForm>
//       </InviteContainer>
//     </InvitePage>
//   );
// };

// export default Invite;
