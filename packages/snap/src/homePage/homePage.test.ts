import { panel, text, heading } from '@metamask/snaps-sdk';

import { onHomePage } from '.';

describe('onHomePage', () => {
  it('shows a panel', async () => {
    expect(await onHomePage()).toRender(
      panel([heading('Hello world!'), text('Welcome to my Snap home page!')]),
    );
  });
});
