import { TeamInfoContainerProps } from './TeamInfoContainer.type';

export const TeamInfoContainer = ({ children, teamName }: TeamInfoContainerProps) => (
  <div className='min-w-[272px]'>
    <div className='h-[100vh] w-[100%] pt-4 px-4 box-border'>
      <div className='bg-main-color h-[50px] text-white p-4 box-border leading-4 font-extrabold text-base rounded-lg'>
        {teamName}
      </div>
      {children}
    </div>
  </div>
);
