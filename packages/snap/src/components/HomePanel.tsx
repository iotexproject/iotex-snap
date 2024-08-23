import { Box, Button, Divider, Link } from '@metamask/snaps-sdk/jsx';

import {
  DEPIN_LIQUIDITY_URL,
  DEPINSCAN_URL,
  IOPAY_URL,
  IOTEX_HOME_URL,
} from '../config/links';

export function HomePanel() {
  return (
    <Box>
      <Button name="convert-address">↔️ Convert Address</Button>
      <Button name="show-my-addresses">👀 Show My Addresses</Button>
      <Divider />
      <Link href={DEPINSCAN_URL}>DePINscan</Link>
      <Link href={IOTEX_HOME_URL}>IoTeX</Link>
      <Link href={IOPAY_URL}>Wallet</Link>
      <Link href={DEPIN_LIQUIDITY_URL}>Mine DePIN Liquidity</Link>
    </Box>
  );
}
