export const MemberIcon = ({ profileImage }: { profileImage: string | null }) =>
  profileImage !== null ? (
    <img
      className='w-[40px] h-[40px] rounded-md'
      src={profileImage}
      alt='MemberItem'
    />
  ) : (
    <div className='bg-grey-line w-[40px] h-[40px] rounded-md' />
  );
