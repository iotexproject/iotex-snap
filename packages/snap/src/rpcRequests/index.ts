import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import { panel, text, copyable, divider } from '@metamask/snaps-sdk';

import { convert0xToIoAddress } from '../utils/convert';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'convert': {
      if (!request.params?.address) {
        throw new Error('Invalid params.');
      }

      const addressToConvert = request.params.address as string;

      const res = convert0xToIoAddress(addressToConvert);

      if (!res) {
        throw new Error('Failed to convert address.');
      }

      return snap.request({
        method: 'snap_dialog',
        params: {
          type: 'alert',
          content: panel([
            text('Your connect account is:'),
            copyable(addressToConvert),
            divider(),
            text('The io representation of the address is:'),
            copyable(res.resolvedAddress),
          ]),
        },
      });
    }
    default:
      throw new Error('Method not found.');
  }
};
