import { useRef } from 'react';

import { useAddTeamModal } from '../Modal';
import { TeamItemProps, TeamAddItemProps, TeamListProps } from './TeamList.type';

const TeamItem = ({ select, img, idx }: TeamItemProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const basicClassName = 'w-[60px] h-[60px] rounded-[12px] cursor-pointer';
  const onError = () => {
    if (imgRef.current === null) return;
    imgRef.current.src = '/asset/ChatProfile.svg';
  };
  return (
    <img
      id='TeamItem'
      ref={imgRef}
      data-id={idx}
      src={img}
      onError={onError}
      className={`${basicClassName} ${select ? 'border-2 border-solid border-main-color' : ''}`}
      alt='팀'
    />
  );
};

const TeamAddItem = ({ onClick }: TeamAddItemProps) => (
  <button
    type='button'
    onClick={onClick}
    className='w-[60px] h-[60px] rounded-full bg-[#bbbbbb] text-white text-[32px] flex justify-center items-center space-x-[10px]'
  >
    +
  </button>
);

export const TeamList = ({ list, teamSelect, handleChangeTeamSelect }: TeamListProps) => {
  const { Component: AddTeamModal, handleOpen } = useAddTeamModal();
  console.log(teamSelect);
  return (
    <div
      onClick={handleChangeTeamSelect}
      aria-hidden
      className='bg-[#F1F1F1] min-w-[90px] h-[100vh] flex flex-col items-center space-y-3 pt-4'
    >
      {list.map((item) => (
        <TeamItem
          key={item.teamId}
          select={teamSelect === item.teamId}
          img={item.profileImage}
          idx={item.teamId}
        />
      ))}
      <TeamAddItem onClick={handleOpen} />
      <AddTeamModal />
    </div>
  );
};
