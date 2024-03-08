import bech32 from 'bech32';
import { Buffer } from "buffer"

export interface IAddress {
  string(): string;

  stringEth(): string;

  bytes(): Uint8Array;
}

class AddressV1 implements IAddress {
  public static ADDRESS_LENGTH: number = 20;
  public static MAINNET_PREFIX: string = 'io';
  public static TESTNET_PREFIX: string = 'it';

  public static prefix(): string {
    // TODO(tian): not sure how to deal with prefix for now
    return this.MAINNET_PREFIX;
  }

  // @ts-ignore
  public payload: Uint8Array;

  public string(): string {
    // @ts-ignore
    const grouped = bech32.toWords(this.payload);
    // @ts-ignore
    return bech32.encode(AddressV1.prefix(), grouped);
  }

  public stringEth(): string {
    // @ts-ignore
    return `0x${Buffer.from(this.payload).toString('hex')}`;
  }

  public bytes(): Uint8Array {
    return this.payload;
  }
}

export function fromBytes(bytes: Uint8Array): IAddress {
  if (bytes.length !== AddressV1.ADDRESS_LENGTH) {
    throw new Error(`invalid address length in bytes: ${bytes.length}`);
  }
  const addr = new AddressV1();
  addr.payload = bytes;
  return addr;
}

export function fromString(addrStr: string): IAddress {
  // @ts-ignore
  const { prefix, words } = bech32.decode(addrStr);
  if (prefix !== AddressV1.prefix()) {
    throw new Error(
      `hrp ${prefix} and address prefix ${AddressV1.prefix()} don't match`,
    );
  }
  const addr = new AddressV1();
  // @ts-ignore
  addr.payload = bech32.fromWords(words);
  return addr;
}

export const convertAddress = (
  addressMode: 'io' | '0x',
  address: string = '',
): string => {
  try {
    if (addressMode === '0x') {

      return fromString(address).stringEth();
    }
    if (addressMode === 'io') {
      return fromBytes(
        // @ts-ignore
        Buffer.from(String(address).replace(/^0x/, ''), 'hex'),
      ).string();
    }
  } catch (error) {}
  return address;
};
