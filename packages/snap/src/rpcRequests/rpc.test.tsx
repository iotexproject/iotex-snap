import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { ConnectedAccountDialog } from '../components/ConnectedAccount';
import { HomePanel } from '../components/HomePanel';

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
      await ui.ok();
      expect(ui).toRender(
        <ConnectedAccountDialog
          connectedAddr={OX_ADDRESS_MOCK}
          ioAddress={IO_ADDRESS_MOCK}
        />,
      );

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

      expect(ui).toRender(<HomePanel />);
    });
  });
});
