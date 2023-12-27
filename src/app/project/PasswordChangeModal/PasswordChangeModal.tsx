import React, { useState } from 'react';
import {
  PasswordChangeModalContainer,
  PasswordChangeModalBackdrop,
  PasswordChangeModalHeader,
  PasswordChangeModalTitle,
  PasswordChangeModalClose,
  PasswordChangeModalForm,
  PasswordChangeModalInput,
  PasswordChangeModalButton,
} from './PasswordChangeModal.styles';

// 함수의 매개변수 타입 정의
interface PasswordChangeModalProps {
  projectId: string;
  onSubmit: (newPassword: string) => void;
  onClose: () => void;
}

const PasswordChangeModal = ({
  onSubmit,
  onClose,
}: PasswordChangeModalProps) => {
  const [newPassword, setNewPassword] = useState('');

  return (
    <PasswordChangeModalBackdrop>
      <PasswordChangeModalContainer>
        <PasswordChangeModalHeader>
          <PasswordChangeModalTitle>비밀번호 변경</PasswordChangeModalTitle>
          <PasswordChangeModalClose onClick={onClose}>
            x
          </PasswordChangeModalClose>
        </PasswordChangeModalHeader>

        <PasswordChangeModalForm>
          <PasswordChangeModalInput
            type="password"
            minLength={4}
            maxLength={10}
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <PasswordChangeModalButton onClick={() => onSubmit(newPassword)}>
            변경하기
          </PasswordChangeModalButton>
        </PasswordChangeModalForm>
      </PasswordChangeModalContainer>
    </PasswordChangeModalBackdrop>
  );
};

export default PasswordChangeModal;
