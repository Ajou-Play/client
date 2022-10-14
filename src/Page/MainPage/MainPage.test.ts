import { expect, describe, it } from '@jest/globals';

import { getTeams, getChannels, getMembers, getArchives } from './MainPage.util';

import { MSW_ARCHIVE_LIST } from '@MSW/Archive/handler';
import { MSW_CHANNEL_LIST } from '@MSW/Channel/handler';
import { MSW_TEAM_LIST, MSW_TEAM_MEMBER_LIST } from '@MSW/Team/handler';

describe('MainPage API Unit Test', () => {
  it('getTeams API Unit Test', async () => {
    const result = await getTeams();
    const expectResult = MSW_TEAM_LIST;
    expect(result).toEqual(expectResult);
  });
  it('getChannels API Unit Test', async () => {
    const teamId = 1;
    const result = await getChannels({ teamId });
    const expectResult = MSW_CHANNEL_LIST[teamId];
    expect(result).toEqual(expectResult);
  });
  it('getMembers API Unit Test', async () => {
    const teamId = 1;
    const result = await getMembers({ teamId });
    const expectResult = MSW_TEAM_MEMBER_LIST[teamId];
    expect(result).toEqual(expectResult);
  });
  it('getArchives API Unit Test', async () => {
    const result = await getArchives();
    const expectResult = MSW_ARCHIVE_LIST;
    expect(result).toEqual(expectResult);
  });
});
