import {
  ButtonType,
  button,
  copyable,
  divider,
  form,
  heading,
  input,
  panel,
  spinner,
  text,
} from '@metamask/snaps-sdk';
import { convert0xToIoAddress } from '../utils/convert';

/**
 * Initiate a new interface with the starting screen.
 *
 * @returns The Snap interface ID.
 */
export async function createInterface(): Promise<string> {
  return await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: homePanel(),
    },
  });
}

/**
 * A panel for home page
 *
 * @returns the panel with main menu
 */
export function homePanel() {
  return panel([
    button({ value: '↔️ Convert Address', name: 'convert-address' }),
    button({ value: '👀 Show My Addresses', name: 'show-my-addresses' }),
    divider(),
    text('[DePINscan](https://depinscan.io)'),
    text('[IoTeX](https://iotex.io)'),
    text('[Wallet](https://wallet.iotex.io)'),
    text('[Mine DePIN Liquidity](https://swap.mimo.exchange/pools)'),
  ]);
}

/**
 * Update the interface with a simple form containing an input and a submit button.
 *
 * @param id - The Snap interface ID to update.
 * @param ioTo0x - Whether the form is for converting IoTeX to Ethereum or vice versa.
 */
export async function showConvertForm(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        heading('Convert Address'),
        form({
          name: 'address-form',
          children: [
            input({
              name: 'address-input',
              placeholder: 'io/0x...',
            }),
            button('Submit', ButtonType.Submit, 'submit'),
            button('Go back', ButtonType.Button, 'go-back'),
          ],
        }),
      ]),
    },
  });
}

/**
 * Asks user to connect addresses and then shows io/0x representation of them
 *
 * @param id id of the interface to update
 */
export async function showMyConvertedAddresses(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        text('A separate Metamask window has been opened.'),
        text('Select addresses there and then return to this window'),
        spinner(),
      ]),
    },
  });

  const addresses = await ethereum.request({
    method: 'eth_requestAccounts',
  });

  const dialog = buildAddressesDialog((addresses as string[]) ?? []);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: dialog,
    },
  });
}

/**
 * For go back button
 *
 * @param id id of the interface to update
 */
export async function updateInterfaceToHomePage(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: homePanel(),
    },
  });
}

/**
 * Update a Snap interface to show a given value.
 *
 * @param id - The Snap interface ID to update.
 * @param originalAddr - The original address to convert.
 * @param convertedAddr - The converted address.
 */
export async function showAddrConvertResult(
  id: string,
  originalAddr: string,
  convertedAddr: string,
) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: panel([
        heading('Address converted successfully'),
        text('Address to convert: '),
        copyable(originalAddr),
        text('Converted address: '),
        copyable(convertedAddr),
      ]),
    },
  });
}

function buildAddressesDialog(addresses: string[]) {
  return panel([
    heading('Your connected addresses'),
    ...addresses.map((addr, idx) => {
      return panel([
        text(`Address ${idx + 1}: `),
        copyable(addr),
        text('Converted address: '),
        copyable(convert0xToIoAddress(addr)?.resolvedAddress),
      ]);
    }),
  ]);
}
