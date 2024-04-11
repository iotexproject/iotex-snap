import { expect } from '@jest/globals';
import { panel, divider, text, button } from '@metamask/snaps-sdk';

import { installSnap } from '@metamask/snaps-jest';

describe('onHomePage', () => {
  it('returns custom UI', async () => {
    const { onHomePage } = await installSnap();

    const response = await onHomePage();

    expect(response).toRender(
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
