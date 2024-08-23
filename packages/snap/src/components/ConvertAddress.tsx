import {
  Box,
  Button,
  Heading,
  Form,
  Input,
  Field,
  Text,
  Copyable,
} from '@metamask/snaps-sdk/jsx';

export function ConvertAddressForm() {
  return (
    <Box>
      <Heading>Convert Address</Heading>
      <Form name="address-form">
        <Field>
          <Input name="address" placeholder="io/0x..." />
        </Field>
        <Button name="submit" type="submit">
          Submit
        </Button>
        <Button type="button" name="go-back">
          Go Back
        </Button>
      </Form>
    </Box>
  );
}

export function ConvertAddressSuccess({
  originalAddr,
  convertedAddr,
}: {
  originalAddr: string;
  convertedAddr: string;
}) {
  return (
    <Box>
      <Heading>Address converted successfully</Heading>
      <Text>Address to convert: </Text>
      <Copyable value={originalAddr} />
      <Text>Converted address: </Text>
      <Copyable value={convertedAddr} />
      <Button type="button" name="go-back">
        Go Back
      </Button>
    </Box>
  );
}
