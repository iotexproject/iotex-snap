import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text, copyable, divider, button } from '@metamask/snaps-sdk';

describe('onRpcRequest', () => {
  it('throws an error if the requested method does not exist', async () => {
    const { request } = await installSnap();

    const response = await request({
      method: 'foo',
    });

    expect(response).toRespondWithError({
      code: -32601,
      message: 'The method does not exist / is not available.',
      stack: expect.any(String),
      data: {
        method: 'foo',
        cause: null,
      },
    });
  });

  describe('web3-to-io', () => {
    it('converts a 0x address to an IO address', async () => {
      const IO_ADDRESS_MOCK = 'io1ga073vrnnr20up5w8pqlu7rjs208cuaxk000k2';
      const OX_ADDRESS_MOCK = '0x475fe8b07398d4fe068e3841fe7872829e7c73a6';
      const { request } = await installSnap();

      const origin = 'Jest';
      const response = request({
        method: 'convert',
        origin,
        params: {
          address: OX_ADDRESS_MOCK,
        },
      });

      const ui = await response.getInterface();
      expect(ui.type).toBe('alert');
      expect(ui).toRender(
        panel([
          text('Your connected account is:'),
          copyable(OX_ADDRESS_MOCK),
          divider(),
          text('The io representation of the address is:'),
          copyable(IO_ADDRESS_MOCK),
        ]),
      );

      await ui.ok();

      expect(await response).toRespondWith(null);
    });
  });

  describe('home request', () => {
    it('should open home page on home request', async () => {
      const { request } = await installSnap();

      const response = request({
        method: 'home',
      });

      const ui = await response.getInterface();

      expect(ui).toRender(
        panel([
          button({ value: '↔️ Convert Address', name: 'convert' }),
          button({ value: '👀 Show My Addresses', name: 'show' }),
          divider(),
          text('[DePINscan](https://depinscan.io)'),
          text('[IoTeX](https://iotex.io)'),
          text('[Wallet](https://wallet.iotex.io)'),
          text('[Mine DePIN Liquidity](https://swap.mimo.exchange/pools)'),
        ]),
      );
    });
  });
});
