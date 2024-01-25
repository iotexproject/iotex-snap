import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';
import { panel, text, copyable, divider } from '@metamask/snaps-sdk';

describe('onRpcRequest', () => {
  it('throws an error if the requested method does not exist', async () => {
    const { request, close } = await installSnap();

    const response = await request({
      method: 'foo',
    });

    expect(response).toRespondWithError({
      code: -32603,
      message: 'Method not found.',
      stack: expect.any(String),
    });

    await close();
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
          text('Your connect account is:'),
          copyable(OX_ADDRESS_MOCK),
          divider(),
          text('The io representation of the address is:'),
          copyable(IO_ADDRESS_MOCK),
        ]),
      );

      await ui.ok();

      await response;
    });
  });
});
