import { rpcErrors } from '@metamask/rpc-errors';
import type { OnRpcRequestHandler } from '@metamask/snaps-sdk';
import {
  panel,
  text,
  copyable,
  divider,
  DialogType,
} from '@metamask/snaps-sdk';

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
      try {
        const params = request?.params as { address: string } | undefined;
        if (!params?.address) {
          throw new Error('Invalid params.');
        }

        const addressToConvert = params.address;

        const res = convert0xToIoAddress(addressToConvert);

        if (!res) {
          throw new Error('Failed to convert address.');
        }

        return snap.request({
          method: 'snap_dialog',
          params: {
            type: DialogType.Alert,
            content: panel([
              text('Your connected account is:'),
              copyable(addressToConvert),
              divider(),
              text('The io representation of the address is:'),
              copyable(res.resolvedAddress),
            ]),
          },
        });
      } catch (error: any) {
        throw rpcErrors.internal({
          data: {
            message: error.message,
          },
        });
      }
    }
    default:
      throw rpcErrors.methodNotFound({
        data: {
          method: request.method,
        },
      });
  }
};
