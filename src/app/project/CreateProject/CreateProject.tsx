'use client';
import React, { useState } from 'react';
import useProjectStore from '@/store/useProjectStore';
import axiosInstance from '@/app/api/axiosInstance';
import { ModalBackdrop } from '@/components/Modal/Modal.styles';
import {
  CreateProjectButton,
  CreateProjectClose,
  CreateProjectContainer,
  CreateProjectDescription,
  CreateProjectForm,
  CreateProjectHead,
  CreateProjectHeader,
  CreateProjectInputTitle,
  CreateProjectLanguage,
  CreateProjectInput,
} from './CreateProject.styles';
import EnterProject from '../EnterProject/EnterProject';

interface CreateProjectProps {
  name: string;
  description: string;
  programmingLanguage: string;
  password: string;
}

interface CreateProps {
  setIsModalOpen: (value: boolean) => void;
}
const CreateProject = ({ setIsModalOpen }: CreateProps) => {
  const [isCreated, setIsCreated] = useState<boolean>(false);
  const [createData, setCreateData] = useState<CreateProjectProps>({
    name: '',
    description: '',
    programmingLanguage: 'PYTHON',
    password: '',
  });

  const postCreateProject = async (createData: CreateProjectProps) => {
    try {
      const response = await axiosInstance.post('/api/projects', createData);
      const data = response.data;
      if (data.success) {
        useProjectStore.getState().addProject(data.results);
        useProjectStore.getState().setProject(data.results);
        setIsCreated(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value, // 해당 이름의 상태를 업데이트
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (createData.name.length >= 10 || createData.description.length >= 100) {
      alert('프로젝트 이름은 10자, 설명은 100자 이내로 작성해주세요.');
    } else if (createData.password.length < 4) {
      alert('비밀번호를 4자 이상 입력해주세요.');
    } else if (
      createData.name.length == 0 ||
      createData.description.length == 0
    ) {
      alert('프로젝트 정보를 입력해주세요.');
    } else if (createData.password.length > 10) {
      alert('비밀번호는 10자 이내로 입력해주세요.');
    } else {
      postCreateProject(createData);
    }
  };

  return isCreated ? (
    <EnterProject setIsModalOpen={setIsModalOpen} />
  ) : (
    <ModalBackdrop>
      <CreateProjectContainer>
        <CreateProjectHeader>
          <CreateProjectHead>프로젝트 생성</CreateProjectHead>
          <CreateProjectClose onClick={handleClose}>x</CreateProjectClose>
        </CreateProjectHeader>

        <CreateProjectForm onSubmit={handleSubmit}>
          <CreateProjectInputTitle>언어 선택</CreateProjectInputTitle>
          <CreateProjectLanguage
            name="programmingLanguage"
            value={createData.programmingLanguage}
            onChange={handleInput}
          >
            <option value="PYTHON">PYTHON</option>
            <option value="JAVA">JAVA</option>
            <option value="CPP">CPP</option>
          </CreateProjectLanguage>

          <CreateProjectInputTitle>프로젝트 이름</CreateProjectInputTitle>
          <CreateProjectInput
            type="text"
            name="name"
            placeholder="프로젝트의 이름을 입력하세요 (10자 이내)"
            onChange={handleInput}
          />

          <CreateProjectInputTitle>프로젝트 비밀번호</CreateProjectInputTitle>
          <CreateProjectInput
            type="password"
            name="password"
            placeholder="설정할 비밀번호를 입력하세요"
            onChange={handleInput}
          />

          <CreateProjectInputTitle>프로젝트 설명</CreateProjectInputTitle>
          <CreateProjectDescription
            name="description"
            placeholder="프로젝트에 대한 간단한 설명을 작성하세요 (100자 이내)"
            onChange={handleInput}
          />

          <CreateProjectButton type="submit">생성하기</CreateProjectButton>
        </CreateProjectForm>
      </CreateProjectContainer>
    </ModalBackdrop>
  );
};

export default CreateProject;
