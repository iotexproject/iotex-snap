import {
  Box,
  Text,
  Copyable,
  Divider,
  Heading,
  Button,
} from '@metamask/snaps-sdk/jsx';

export function ConnectedAccountDialog({
  connectedAddr,
  ioAddress,
}: {
  connectedAddr: string;
  ioAddress: string;
}) {
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

export function ConnectedAccountsList({
  addresses,
}: {
  addresses: { [key: string]: string };
}) {
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
