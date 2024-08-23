import type { OnHomePageHandler } from '@metamask/snaps-sdk';

import { createInterface } from '../interactiveUI/ui';

export const onHomePage: OnHomePageHandler = async () => {
  const interfaceId = await createInterface();

  return { id: interfaceId };
};
