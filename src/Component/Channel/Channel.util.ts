export const GENERAL = 'General';
export const GENERAL_SELECT_ICON_SRC = '/asset/GeneralChannelIcon.svg';
export const GENERAL_UN_SELECT_ICON_SRC = '/asset/NoGeneralChannelIcon.svg';
export const UN_GENERAL_SELECT_ICON_SRC = '/asset/ChannelIcon.svg';
export const UN_GENERAL_UN_SELECT_ICON_SRC = '/asset/NoChannelIcon.svg';
export const getChannelIconSrc = ({ name, select }: { name: string; select: boolean }) =>
  name === GENERAL
    ? select
      ? GENERAL_SELECT_ICON_SRC
      : GENERAL_UN_SELECT_ICON_SRC
    : select
    ? UN_GENERAL_SELECT_ICON_SRC
    : UN_GENERAL_UN_SELECT_ICON_SRC;
