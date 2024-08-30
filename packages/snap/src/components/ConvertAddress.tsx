/* eslint-disable @typescript-eslint/naming-convention */
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

/**
 * Shows a form of address convertion.
 *
 * @returns A address convert form.
 */
export function ConvertAddressForm(): JSX.Element {
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

/**
 * Shows a resulted screen for address convertion.
 *
 * @param params - JSX Elements params.
 * @param params.originalAddr - The address to convert.
 * @param params.convertedAddr - The converted address.
 * @returns A resulted screen with addresses.
 */
export function ConvertAddressSuccess({
  originalAddr,
  convertedAddr,
}: {
  originalAddr: string;
  convertedAddr: string;
}): JSX.Element {
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
