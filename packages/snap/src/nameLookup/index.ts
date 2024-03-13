import type {
  DomainLookupResult,
  OnNameLookupHandler,
} from '@metamask/snaps-sdk';

import { convertIoToOxAddress } from '../utils/convert';
import { getDomainQuery, INS_SUBGRAPH } from './queryINS';

const IOTEX_MAINNET_CHAIN_ID = 'eip155:4689';
const IOTEX_TESTNET_CHAIN_ID = 'eip155:4690';

/**
 * Handle incoming name lookup requests from the MetaMask clients.
 *
 * @param request - The request arguments.
 * @param request.domain - The domain to resolve. Will be undefined if an address is provided.
 * @param request.address - The address to resolve. Will be undefined if a domain is provided.
 * @param request.chainId - The CAIP-2 chain ID of the associated network.
 * @returns If successful, an object containing the resolvedDomain or resolvedAddress. Null otherwise.
 * @see https://docs.metamask.io/snaps/reference/exports/#onnamelookup
 */
export const onNameLookup: OnNameLookupHandler = async (request) => {
  const { chainId, domain } = request;

  if (
    chainId !== IOTEX_MAINNET_CHAIN_ID &&
    chainId !== IOTEX_TESTNET_CHAIN_ID
  ) {
    return null;
  }

  if (domain) {
    if (domain.endsWith('.io') && chainId === IOTEX_MAINNET_CHAIN_ID) {
      return await getInsDomainOwner(domain);
    }

    if (domain.startsWith('io')) {
      return convertIoToOxAddress(domain);
    }
  }

  return null;
};

/**
 * Get the owner of an IoTeX domain.
 * @param domain - The domain to resolve.
 * @returns If successful, an object containing the resolvedAddress. Null otherwise.
 */
async function getInsDomainOwner(
  domain: string,
): Promise<DomainLookupResult | null> {
  type Data = {
    data: {
      domains: Domain[];
    };
  };

  type Domain = {
    resolvedAddress: {
      id: string;
    };
  };

  const res = await fetch(INS_SUBGRAPH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getDomainQuery,
      variables: {
        name: domain,
      },
    }),
  });
  const { data } = (await res.json()) as Data;

  const resolvedAddress = data?.domains?.[0]?.resolvedAddress?.id;

  return resolvedAddress
    ? {
        resolvedAddresses: [
          {
            protocol: 'ins',
            resolvedAddress,
          },
        ],
      }
    : null;
}
