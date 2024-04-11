import type { OnUserInputHandler } from '@metamask/snaps-sdk';
import { UserInputEventType } from '@metamask/snaps-sdk';

import {
  showConvertForm,
  showMyConvertedAddresses,
  showAddrConvertResult,
  updateInterfaceToHomePage,
} from './ui';
import { convert0xToIoAddress, convertIoToOxAddress } from '../utils/convert';

/**
 * Handle incoming user events coming from the MetaMask clients open interfaces.
 *
 * @param params - The event parameters.
 * @param params.id - The Snap interface ID where the event was fired.
 * @param params.event - The event object containing the event type, name and value.
 * @see https://docs.metamask.io/snaps/reference/exports/#onuserinput
 */
export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  if (event.type === UserInputEventType.ButtonClickEvent) {
    switch (event.name) {
      case 'convert-address':
        await showConvertForm(id);
        break;

      case 'show-my-addresses':
        await showMyConvertedAddresses(id);
        break;

      case 'go-back':
        await updateInterfaceToHomePage(id);
        break;

      default:
        break;
    }
  }

  if (
    event.type === UserInputEventType.FormSubmitEvent &&
    event.name === 'address-form'
  ) {
    const address = event.value['address-input'];
    processSubmitedAddress(id, address);
  }
};

/**
 *
 * @param id - The Snap interface ID where the event was fired.
 * @param address - user's address from input to convert
 * @returns Returns if invalid input, otherwise shows result
 */
const processSubmitedAddress = async (
  id: string,
  address: string | undefined,
) => {
  if (!address) {
    await showAddrConvertResult(id, '', 'Invalid address');
    return;
  }

  convertAddress(id, address);
};

/**
 * Convert an address from 0x to io or vice versa.
 *
 * @param id - The Snap interface ID where the event was fired.
 * @param address - The address to convert.
 */
const convertAddress = async (id: string, address: string) => {
  let convertedAddress: string | undefined;

  if (address) {
    if (address.startsWith('0x')) {
      const convertResult = convert0xToIoAddress(address);
      convertedAddress = convertResult?.resolvedAddress;
    }

    if (address.startsWith('io')) {
      const convertResult = convertIoToOxAddress(address);
      convertedAddress = convertResult?.resolvedAddresses[0].resolvedAddress;
    }
  }

  await showAddrConvertResult(
    id,
    address,
    convertedAddress || 'Invalid address',
  );
};
