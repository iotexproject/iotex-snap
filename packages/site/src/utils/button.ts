import { isLocalSnap } from './snap';
import type { Snap } from '../types';

export const shouldDisplayReconnectButton = (
  installedSnap?: Snap,
): boolean | undefined => installedSnap && isLocalSnap(installedSnap?.id);
