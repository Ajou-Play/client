import { expect, describe, it } from '@jest/globals';

import { DateTransHm } from './MessageContent.util';

describe('DateTransHm Func Unit Test', () => {
  it('get Hour:Minute', () => {
    const result = DateTransHm(new Date('Fri Oct 14 2022 16:55:44 GMT+0900 (한국 표준시)'));
    const expectResult = '16:55';
    expect(result).toEqual(expectResult);
  });

  it('get time add hour Hour:Minute', () => {
    const result = DateTransHm(new Date('Fri Oct 14 2022 06:55:44 GMT+0900 (한국 표준시)'));
    const expectResult = '06:55';
    expect(result).toEqual(expectResult);
  });

  it('get time add minute Hour:Minute', () => {
    const result = DateTransHm(new Date('Fri Oct 14 2022 16:05:44 GMT+0900 (한국 표준시)'));
    const expectResult = '16:05';
    expect(result).toEqual(expectResult);
  });

  it('get time add minute,hour Hour:Minute', () => {
    const result = DateTransHm(new Date('Fri Oct 14 2022 06:05:44 GMT+0900 (한국 표준시)'));
    const expectResult = '06:05';
    expect(result).toEqual(expectResult);
  });
});
