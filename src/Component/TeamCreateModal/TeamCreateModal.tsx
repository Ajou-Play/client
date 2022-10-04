import { useRef } from 'react';

import { TeamCreateModalProps } from './TeamCreateModal.type';

export const TeamCreateModal = ({ handleAddTeam, handleModalClose }: TeamCreateModalProps) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const handleClickButton = () => {
    const teamId = 1;
    const name = nameRef.current!.value;
    const img = imgRef.current!.value;
    handleAddTeam({ teamId, name, img });
    handleModalClose();
  };
  return (
    <div>
      <input
        placeholder='이름을 입력하세요.'
        ref={nameRef}
      />
      <input
        placeholder='이미지을 입력하세요.'
        ref={imgRef}
      />
      <button
        type='button'
        onClick={handleClickButton}
      >
        생성하기
      </button>
    </div>
  );
};
