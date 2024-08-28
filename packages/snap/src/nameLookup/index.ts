import type {
  DomainLookupResult,
  OnNameLookupHandler,
} from '@metamask/snaps-sdk';

import { convertIoToOxAddress } from '../utils/convert';
import { getDomainOwnerQuery, INS_SUBGRAPH } from './queryINS';
import type { AccountData, DomainData } from './types';

const IOTEX_MAINNET_CHAIN_ID = 'eip155:4689';
const IOTEX_TESTNET_CHAIN_ID = 'eip155:4690';

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
      return getInsDomainOwner(domain);
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
export async function getInsDomainOwner(
  domain: string,
): Promise<DomainLookupResult | null> {
  const domainOwners = await sendDomainRequest(domain);

  if (!domainOwners || domainOwners.domains?.length < 1) {
    return null;
  }

  const resolvedAddress = domainOwners.domains[0]?.resolvedAddress?.id;

  return resolvedAddress
    ? {
        resolvedAddresses: [
          {
            protocol: 'ins',
            domainName: domain,
            resolvedAddress,
          },
        ],
      }
    : null;
}

/**
 * Get the domains of the account.
 *
 * @param address - The address of the owner.
 * @returns If successful, an object containing the owner domains. Null otherwise.
 */
export async function getAccountDomains(
  address: string,
): Promise<string | null | undefined> {
  const accountResult = await sendAccountRequest(address);

  if (!accountResult || accountResult.account?.wrappedDomains?.length < 1) {
    return null;
  }

  const resolvedDomain = accountResult.account.wrappedDomains[0]?.name;

  return resolvedDomain;
}

/**
 * Send the POST request to ins subgraph.
 * @param domain - The domain to resolve.
 * @returns If successful, an object containing the response. Null otherwise.
 */
async function sendDomainRequest(domain: string): Promise<DomainData> {
  const res = await fetch(INS_SUBGRAPH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getDomainOwnerQuery,
      variables: {
        name: domain,
      },
    }),
  });
  const { data } = await res.json();
  return data;
}

/**
 * Send the POST request to ins subgraph.
 * @param address - The owner address.
 * @returns If successful, an object containing the response. Null otherwise.
 */
async function sendAccountRequest(address: string): Promise<AccountData> {
  const res = await fetch(INS_SUBGRAPH, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: getDomainOwnerQuery,
      variables: {
        address,
      },
    }),
  });
  const { data } = await res.json();
  return data;
}
