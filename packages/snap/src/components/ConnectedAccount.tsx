/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Text,
  Copyable,
  Divider,
  Heading,
  Button,
} from '@metamask/snaps-sdk/jsx';

/**
 * Shows a dialog with connected addresses.
 *
 * @param params - JSX Elements params.
 * @param params.connectedAddr - The connected address to convert.
 * @param params.ioAddress - The converted address.
 * @returns A home page.
 */
export function ConnectedAccountDialog({
  connectedAddr,
  ioAddress,
}: {
  connectedAddr: string;
  ioAddress: string;
}): JSX.Element {
  return (
    <Box>
      <Text>Your connected account is:</Text>
      <Copyable value={connectedAddr} />
      <Divider />
      <Text>The io representation of the address is:</Text>
      <Copyable value={ioAddress} />
    </Box>
  );
}

/**
 * Shows a resulted screen for address convertion.
 *
 * @param params - JSX Elements params.
 * @param params.addresses - The address to convert.
 * @returns A list with converted addresses.
 */
export function ConnectedAccountsList({
  addresses,
}: {
  addresses: { [key: string]: string };
}): JSX.Element {
  return (
    <Box>
      <Heading>Your connected addresses</Heading>
      {Object.keys(addresses).map((addr) => (
        <Box>
          <Divider />
          <Text>0x:</Text>
          <Copyable value={addr} />
          <Text>io:</Text>
          <Copyable value={addresses[addr] as string} />
        </Box>
      ))}

      <Divider />
      <Button name="go-back">Go Back</Button>
    </Box>
  );
}
