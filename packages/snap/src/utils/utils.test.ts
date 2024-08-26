import { expect } from '@jest/globals';

import { convert0xToIoAddress, convertIoToOxAddress } from './convert';

describe('Utils', () => {
  it('should throw if the addr doesnt start with io', () => {
    expect(() =>
      convertIoToOxAddress('i01ga073vrnnr20up5w8pqlu7rjs208cuaxk000k2'),
    ).toThrow('Invalid io address');
  });
  it('should return null if incorrect io address', () => {
    const res = convertIoToOxAddress('io 1nwldj5');
    expect(res).toBe(null);
  });
  it('should throw if the addr doesnt start with 0x', () => {
    expect(() =>
      convert0xToIoAddress('ox475fe8b07398d4fe068e3841fe7872829e7c73a6'),
    ).toThrow('Invalid 0x address');
  });
  it('should throw if incorrect 0x address', () => {
    expect(() =>
      convert0xToIoAddress('0x445fe8b07398dfe068e3841fe7872829e7c73a6'),
    ).toThrow('Error converting 0x Address');
  });
});
