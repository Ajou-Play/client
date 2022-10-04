export const getChannelIconSrc = ({ name, select }: { name: string; select: boolean }) =>
  name === 'General'
    ? select
      ? '/asset/GeneralChannelIcon.svg'
      : '/asset/NoGeneralChannelIcon.svg'
    : select
    ? '/asset/ChannelIcon.svg'
    : '/asset/NoChannelIcon.svg';
