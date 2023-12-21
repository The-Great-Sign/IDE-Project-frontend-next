'use client';
import React, { useState } from 'react';
import useProjectStore from '@/store/useProjectStore';
import axiosInstance from '@/app/api/axiosInstance';
import {
  CreateProjectButton,
  // CreateProjectClose,
  CreateProjectContainer,
  CreateProjectDescription,
  CreateProjectForm,
  // CreateProjectHead,
  // CreateProjectHeader,
  CreateProjectInputTitle,
  CreateProjectLanguage,
  CreateProjectPassword,
  CreateProjectTitle,
} from './CreateProject.styles';

interface CreateProjectProps {
  name: string;
  description: string;
  programmingLanguage: string;
  password: string;
}

const CreateProject = () => {
  const [createData, setCreateData] = useState<CreateProjectProps>({
    name: '',
    description: '',
    programmingLanguage: 'PYTHON',
    password: '',
  });

  const postCreateProject = async (createData: CreateProjectProps) => {
    try {
      console.log(createData);
      const response = await axiosInstance.post('/api/projects', createData);
      const data = response.data;
      if (data.success) {
        console.log(data.results);
        useProjectStore.getState().addProject(data.results);
        // const currentState = useProjectStore.getState();
        // console.log("현재 프로젝트 상태:", currentState.projects);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setCreateData({
      ...createData,
      [name]: value, // 해당 이름의 상태를 업데이트
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(createData);
    postCreateProject(createData);
  };

  return (
    <CreateProjectContainer>
      {/* <CreateProjectHeader>
        <CreateProjectHead />
        <CreateProjectClose />
      </CreateProjectHeader> */}

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
        <CreateProjectTitle type="text" name="name" onChange={handleInput} />

        <CreateProjectInputTitle>프로젝트 비밀번호</CreateProjectInputTitle>
        <CreateProjectPassword
          type="text"
          name="password"
          placeholder="설정할 비밀번호를 입력하세요"
          onChange={handleInput}
        />

        <CreateProjectInputTitle>프로젝트 설명</CreateProjectInputTitle>
        <CreateProjectDescription
          type="text"
          name="description"
          placeholder="프로젝트에 대한 간단한 설명을 작성하세요"
          onChange={handleInput}
        />

        <CreateProjectButton type="submit">생성하기</CreateProjectButton>
      </CreateProjectForm>
    </CreateProjectContainer>
  );
};

export default CreateProject;
