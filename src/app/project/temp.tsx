// import { useEffect, useState } from 'react';
// import {
//   ContextMenu,
//   ContextMenuButton,
//   MoreIcon,
//   ProjectView,
// } from './Project.styles';
// import axiosInstance from '../api/axiosInstance';
// import {
//   EmptyProjectBox,
//   MyProjectView,
//   ProjectHeader,
//   ProjectInfoBox,
// } from './Project.styles';
// import { IoIosMore } from 'react-icons/io';
// import { ProjectEnterButton } from '@/components/Button/Button';
// import { FaPlay } from 'react-icons/fa6';

// interface InvitedProject {
//   id: string;
//   name: string;
//   programmingLanguage: string;
//   description: string;
//   updatedAt: string;
// }

// const InvitedProject = () => {
//   const [invitedProjects, setInvitedProjects] = useState<InvitedProject[]>([]);
//   const [showOptions, setShowOptions] = useState(false);
//   const [selectedProjectId, setSelectedProjectId] = useState(null);
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
//   const [passwordChangingProjectId, setPasswordChangingProjectId] =
//     useState(null);
//   const router = useRouter\();

//   const handleMoreIconClick = (projectId, event) => {
//     console.log(`MoreIcon clicked for project ${projectId}`);
//     event.stopPropagation();
//     if (selectedProjectId === projectId) {
//       setShowOptions(!showOptions); // 이미 선택된 프로젝트일 경우 토글
//     } else {
//       setShowOptions(true); // 새로운 프로젝트 선택
//       setSelectedProjectId(projectId);
//     }
//   };

//   const handlePasswordChange = projectId => {
//     // 비밀번호 변경 로직
//     console.log(`Change password for project ${projectId}`);
//     // 여기에 비밀번호 변경 관련 로직 추가
//   };

//   const handleProjectDelete = async (projectId: string) => {
//     // 프로젝트 삭제 로직

//     // 비밀번호 변경 로직
//     // const response = axiosInstance.patch(`/api/projects/${projectId}/new-password`, {

//     // })
//     console.log(`Delete project ${projectId}`);
//     // 여기에 프로젝트 삭제 관련 로직 추가
//   };

//   const handleEnterProject = projectId => {
//     // 프로젝트 입장 로직
//     console.log(`Enter project ${projectId}`);
//     // 여기에 프로젝트 입장 관련 로직 추가
//   };

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const response = await axiosInstance.get(`/api/projects/me/joined`);
//         console.log('joined response: ', response);
//         setInvitedProjects(response.data.results.content);
//       } catch (e) {
//         console.error('프로젝트 로드 중 에러 발생:', e);
//       }
//     };
//     fetchProjects();

//     // const closeMenu = () => {
//     //   setShowOptions(false);
//     //   setSelectedProjectId(null);
//     // };

//     // 문서 전체에 클릭 이벤트 리스너 추가
//     // document.addEventListener('click', closeMenu);

//     // // 컴포넌트가 언마운트될 때 리스너 제거
//     // return () => {
//     //   document.removeEventListener('click', closeMenu);
//     // };
//   }, []);

//   return (
//     <ProjectView>
//       <ProjectHeader>
//         <h2>초대받은 프로젝트</h2>
//       </ProjectHeader>

//       {invitedProjects.length === 0 ? (
//         <EmptyProjectBox>
//           <p>텅</p>
//         </EmptyProjectBox>
//       ) : (
//         <MyProjectView>
//           {invitedProjects.map(invitedProject => (
//             <ProjectInfoBox key={invitedProject.id}>
//               <MoreIcon
//                 onClick={e => handleMoreIconClick(invitedProject.id, e)}
//               >
//                 <IoIosMore />
//               </MoreIcon>

//               {/* 선택한 프로젝트에만 옵션 모달 표시 */}
//               {showOptions && selectedProjectId === invitedProject.id && (
//                 <ContextMenu>
//                   <ContextMenuButton
//                     onClick={() => handlePasswordChange(invitedProject.id)}
//                   >
//                     비밀번호 수정
//                   </ContextMenuButton>
//                   <ContextMenuButton
//                     onClick={() => handleProjectDelete(invitedProject.id)}
//                   >
//                     프로젝트 삭제
//                   </ContextMenuButton>
//                 </ContextMenu>
//               )}

//               {/* 기타 정보 */}
//               <p>{invitedProject.name}</p>
//               <p>{invitedProject.programmingLanguage}</p>
//               <p>{invitedProject.description}</p>
//               <p>{invitedProject.updatedAt}</p>

//               <ProjectEnterButton
//                 onClick={() => handleEnterProject(invitedProject.id)}
//               >
//                 <FaPlay /> 입장하기
//               </ProjectEnterButton>
//             </ProjectInfoBox>
//           ))}
//         </MyProjectView>
//       )}
//     </ProjectView>
//   );
// };

// export default InvitedProject;
