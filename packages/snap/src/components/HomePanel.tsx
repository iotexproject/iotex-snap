/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Heading, Link } from '@metamask/snaps-sdk/jsx';

import {
  DEPIN_LIQUIDITY_URL,
  DEPINSCAN_URL,
  IOPAY_URL,
  IOTEX_HOME_URL,
} from '../config/links';

export type DSProject = {
  project_name: string;
  slug: string;
  description: string | null;
  token: string | null;
  market_cap: string | number | null;
  token_price: string | number | null;
  total_devices: string | number | null;
  avg_device_cost: string | number | null;
  days_to_breakeven: string | number | null;
  estimated_daily_earnings: string | number | null;
};

/**
 * Shows a home page.
 *
 * @returns A home page.
 */
export function HomePanel() {
  return (
    <Box>
      <Heading>Links</Heading>
      <Link href={DEPINSCAN_URL}>👾 DePINscan</Link>
      <Link href={IOTEX_HOME_URL}>🔗 IoTeX</Link>
      <Link href={IOPAY_URL}>💰 Wallet</Link>
      <Link href={DEPIN_LIQUIDITY_URL}>⛏️ Mine DePIN Liquidity</Link>

      <Heading>Actions</Heading>
      <Button name="convert-address">🔁 Convert Address</Button>
      <Button name="show-my-addresses">👀 Show My Addresses</Button>
      <Button name="fetch-ds-projects">📁 Show DePIN Scan Projects</Button>
      <Button name="clear-ds-projects">♻️ Clear DePIN Scan data</Button>
    </Box>
  );
}
