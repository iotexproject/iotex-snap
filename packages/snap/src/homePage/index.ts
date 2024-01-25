import type { OnHomePageHandler } from '@metamask/snaps-sdk';
import { panel, text, heading } from '@metamask/snaps-sdk';

export const onHomePage: OnHomePageHandler = async () => {
  return {
    content: panel([
      heading('IoTeX snap'),
      heading('Following features are supported:'),
      text('Address conversion from 0x to io address'),
      text('Address conversion from io to 0x address'),
      text('Sending assets to INS domain in on IoTeX mainnet'),
    ]),
  };
};
