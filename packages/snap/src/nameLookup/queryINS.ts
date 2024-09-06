export const getDomainOwnerQuery = `
  query getDomain($name: String!) {
    domains(where: { name: $name }) {
      resolvedAddress {
        id
      }
    }
  }
`;

export const getDomainByAddrQuery = `
  query getDomain($address: String!) {
    account(id: $address) {
      wrappedDomains {
        domain {
          name
        }
      }
    }
  }
`;

export const INS_SUBGRAPH =
  'https://graph.mainnet.iotex.io/subgraphs/name/mainnet/ins';
