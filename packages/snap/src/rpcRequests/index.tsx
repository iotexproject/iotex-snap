import { rpcErrors } from '@metamask/rpc-errors';
import type { JsonRpcRequest, OnRpcRequestHandler } from '@metamask/snaps-sdk';

import { ConnectedAccountDialog } from '../components/ConnectedAccount';
import { createInterface } from '../interactiveUI/ui';
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
        return processConvertRpcRequest(request);
      } catch (error: any) {
        throw rpcErrors.internal({
          data: {
            message: error.message,
          },
        });
      }
    }
    case 'home': {
      try {
        return await processHomeRpcRequest();
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

/**
 * Handle incoming JSON-RPC requests to open the home page.
 *
 * @returns The result of `snap_dialog`.
 */
async function processHomeRpcRequest() {
  const interfaceId = await createInterface();

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      id: interfaceId,
    },
  });
}

/**
 * Handle incoming JSON-RPC requests to open the home page.
 *
 * @param request - JsonRpcRequest.
 * @returns The result of `rpcConnectedAddressPanel`.
 */
async function processConvertRpcRequest(request: JsonRpcRequest) {
  const params = request?.params as { address: string } | undefined;
  if (!params?.address) {
    throw new Error('Invalid params.');
  }

  const addressToConvert = params.address;

  const res = convert0xToIoAddress(addressToConvert);

  if (!res) {
    throw new Error('Failed to convert address.');
  }

  return rpcConnectedAddressPanel(addressToConvert, res);
}

/**
 * Requests a dialog with connected address and it's converted version.
 *
 * @param addressToConvert - Address to convert 0x or io.
 * @param res - An object with converted version of the address.
 * @param res.resolvedAddress - Converted version of the address.
 * @returns The result of `rpcConnectedAddressPanel`.
 */
async function rpcConnectedAddressPanel(
  addressToConvert: string,
  res: { resolvedAddress: string },
) {
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'alert',
      content: (
        <ConnectedAccountDialog
          connectedAddr={addressToConvert}
          ioAddress={res.resolvedAddress}
        />
      ),
    },
  });
}
