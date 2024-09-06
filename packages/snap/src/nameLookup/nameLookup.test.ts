/* eslint-disable no-restricted-globals */
import { describe, it } from '@jest/globals';
import type { ChainId } from '@metamask/snaps-sdk';

import { getAccountDomains, onNameLookup } from '.';

const DOMAIN_MOCK = 'satoshi.io';
const INVALID_DOMAIN_MOCK = 'invalid.i';
const ADDRESS_MOCK = '0xec71bb05f232bb4c128cd4ae61d4e66799686f20';

const IO_ADDRESS_MOCK = 'io1ga073vrnnr20up5w8pqlu7rjs208cuaxk000k2';
const INVALID_IO_ADDRESS_MOCK = 'io1ga073vrnnr20up5w8pqlu7rjs208cuaxk000k';
const OX_ADDRESS_MOCK = '0x475fe8b07398d4fe068e3841fe7872829e7c73a6';

const INVALID_INPUT_MOCK = 'invalid';

const IOTEX_MAIN_CHAIN_ID_MOCK = 'eip155:4689' as ChainId;
const IOTEX_TESTNET_CHAIN_ID_MOCK = 'eip155:4690' as ChainId;
const ETH_CHAIN_ID_MOCK = 'eip155:1' as ChainId;

describe('onNameLookup', () => {
  describe('when domain is provided', () => {
    it('returns resolved address if valid domain', async () => {
      const request = {
        domain: DOMAIN_MOCK,
        chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => ({
          data: {
            domains: [
              {
                resolvedAddress: {
                  id: ADDRESS_MOCK,
                },
              },
            ],
          },
        }),
      } as any);

      expect(await onNameLookup(request)).toStrictEqual({
        resolvedAddresses: [
          {
            protocol: 'ins',
            domainName: DOMAIN_MOCK,
            resolvedAddress: ADDRESS_MOCK,
          },
        ],
      });
    });
    it('returns null if no resolved addresses', async () => {
      const request = {
        domain: DOMAIN_MOCK,
        chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => ({
          data: {
            domains: [
              {
                resolvedAddress: null,
              },
            ],
          },
        }),
      } as any);

      expect(await onNameLookup(request)).toBeNull();
    });
    it('returns null if invalid domain', async () => {
      const request = {
        domain: INVALID_DOMAIN_MOCK,
        chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
      };

      expect(await onNameLookup(request)).toBeNull();
    });
    it('returns null if owner not found', async () => {
      const request = {
        domain: DOMAIN_MOCK,
        chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
      };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => ({
          data: {
            domains: [],
          },
        }),
      } as any);

      expect(await onNameLookup(request)).toBeNull();
    });
    it('returns null if not iotex mainnet', async () => {
      const request = {
        domain: DOMAIN_MOCK,
        chainId: IOTEX_TESTNET_CHAIN_ID_MOCK,
      };

      expect(await onNameLookup(request)).toBeNull();
    });
  });
  describe('when io address is provided', () => {
    it('returns resolved 0x address if io address', async () => {
      const request = {
        domain: IO_ADDRESS_MOCK,
        chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
      };

      expect(await onNameLookup(request)).toStrictEqual({
        resolvedAddresses: [
          {
            protocol: 'ins',
            domainName: IO_ADDRESS_MOCK,
            resolvedAddress: OX_ADDRESS_MOCK,
          },
        ],
      });
    });
    it('returns resolved address and ins domain', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => ({
          data: {
            account: {
              wrappedDomains: [
                {
                  domain: {
                    name: DOMAIN_MOCK,
                  },
                },
              ],
            },
          },
        }),
      } as any);

      expect(await getAccountDomains(IO_ADDRESS_MOCK)).toStrictEqual(
        DOMAIN_MOCK,
      );
    });
    it('returns null if account doesnt have domains', async () => {
      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        json: async () => ({
          data: {
            account: {
              wrappedDomains: [],
            },
          },
        }),
      } as any);

      expect(await getAccountDomains(IO_ADDRESS_MOCK)).toBeUndefined();
    });
    it('returns null if invalid io address', async () => {
      const request = {
        domain: INVALID_IO_ADDRESS_MOCK,
        chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
      };

      expect(await onNameLookup(request)).toBeNull();
    });
    it('returns null if not iotex chain', async () => {
      const request = {
        domain: IO_ADDRESS_MOCK,
        chainId: ETH_CHAIN_ID_MOCK,
      };

      expect(await onNameLookup(request)).toBeNull();
    });
  });
  it('returns null if no valid domain or address', async () => {
    const request = {
      domain: INVALID_INPUT_MOCK,
      chainId: IOTEX_MAIN_CHAIN_ID_MOCK,
    };

    expect(await onNameLookup(request)).toBeNull();
  });
});
