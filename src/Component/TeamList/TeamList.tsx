import { TeamItemProps, TeamAddItemProps, TeamListProps } from './TeamList.type';

const TeamItem = ({ select, img, idx }: TeamItemProps) => {
  const basicClassName = 'w-[60px] h-[60px] rounded-[12px] cursor-pointer';
  return (
    <img
      id='TeamItem'
      data-id={idx}
      src={img}
      className={
        select ? `${basicClassName} border-2 border-solid border-main-color` : `${basicClassName}`
      }
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

export const TeamList = ({
  list,
  teamSelect,
  handleChangeTeamSelect,
  handleModalOpen,
}: TeamListProps) => (
  <div
    onClick={handleChangeTeamSelect}
    aria-hidden
    className='bg-[#F1F1F1] w-[90px] h-[100vh] flex flex-col items-center space-y-3 pt-4'
  >
    {list.map((item, idx) => (
      <TeamItem
        key={item.teamId}
        select={teamSelect === idx}
        img={item.img}
        idx={idx}
      />
    ))}
    <TeamAddItem onClick={handleModalOpen} />
  </div>
);
