import { from } from '@iotexproject/iotex-address-ts';

/**
 * Convert an IoTeX address to an Ethereum address.
 * @param address - The address to resolve.
 * @returns If successful, an object containing the resolvedAddress. Null otherwise.
 */
export function convertIoToOxAddress(
  address: string,
): { resolvedAddress: string } | null {
  try {
    const resolvedAddress = from(address).stringEth();
    return resolvedAddress ? { resolvedAddress } : null;
  } catch (error) {
    return null;
  }
}

/**
 * Convert an Ethereum address to an IoTeX address.
 * @param address - The address to resolve.
 * @returns If successful, an object containing the resolvedAddress. Null otherwise.
 */
export function convert0xToIoAddress(
  address: string,
): { resolvedAddress: string } | null {
  try {
    const resolvedAddress = from(address).string();
    return resolvedAddress ? { resolvedAddress } : null;
  } catch (error) {
    return null;
  }
}
