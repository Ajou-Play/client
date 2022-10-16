import { expect, describe, it } from '@jest/globals';

import {
  GENERAL,
  GENERAL_SELECT_ICON_SRC,
  GENERAL_UN_SELECT_ICON_SRC,
  getChannelIconSrc,
  UN_GENERAL_SELECT_ICON_SRC,
  UN_GENERAL_UN_SELECT_ICON_SRC,
} from './BasicTeamInfo.util';

describe('getChannelIconSrc Util Func Unit Test', () => {
  it('General Channel Select', () => {
    const result = getChannelIconSrc({ name: GENERAL, select: true });
    const expectResult = GENERAL_SELECT_ICON_SRC;
    expect(result).toEqual(expectResult);
  });
  it('General Channel Un Select', () => {
    const result = getChannelIconSrc({ name: GENERAL, select: false });
    const expectResult = GENERAL_UN_SELECT_ICON_SRC;
    expect(result).toEqual(expectResult);
  });
  it('Un General Channel Select', () => {
    const result = getChannelIconSrc({ name: '', select: true });
    const expectResult = UN_GENERAL_SELECT_ICON_SRC;
    expect(result).toEqual(expectResult);
  });
  it('Un General Channel Un Select', () => {
    const result = getChannelIconSrc({ name: '', select: false });
    const expectResult = UN_GENERAL_UN_SELECT_ICON_SRC;
    expect(result).toEqual(expectResult);
  });
});
