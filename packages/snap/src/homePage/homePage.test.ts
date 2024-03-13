import { panel, text, heading } from '@metamask/snaps-sdk';

import { onHomePage } from '.';

describe('onHomePage', () => {
  it('shows a panel', async () => {
    expect(await onHomePage()).toRender(
      panel([
        heading('IoTeX snap'),
        heading('Following features are supported:'),
        text('Address conversion from 0x to io address'),
      ]),
    );
  });
});
