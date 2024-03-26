import { expect } from '@jest/globals';
import { panel, heading, button } from '@metamask/snaps-sdk';

import { installSnap } from '@metamask/snaps-jest';

describe('onHomePage', () => {
  it('returns custom UI', async () => {
    const { onHomePage } = await installSnap();

    const response = await onHomePage();

    expect(response).toRender(
      panel([
        heading('Convert Address from 0x to io and vice versa'),
        button({ value: 'Start', name: 'convert' }),
      ]),
    );
  });
});
