import { MemberIcon } from '@Component/.';

export const TeamMemberWindow = ({ memberItems }: { memberItems: any }) => {
  console.log(memberItems);

  return memberItems.map(({ userId, profileImage, name }: any) => (
    <div
      key={userId}
      className='w-[100%] p-[1rem] flex gap-[1rem] items-center'
    >
      <MemberIcon profileImage={profileImage} />
      <p>{name}</p>
    </div>
  ));
};
