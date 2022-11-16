import { ArchiveListProps } from '../Archive/ChannelArchive.type';

import { MainPageBody } from '@Page/MainPage/MainPage.type';

export type MainViewProps = ArchiveListProps & {
  body: MainPageBody;
};
