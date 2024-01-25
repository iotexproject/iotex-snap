export const getDomainQuery = `
  query getDomain($name: String!) {
    domains(where: { name: $name }) {
      resolvedAddress {
        id
      }
    }
  }
`;

export const INS_SUBGRAPH =
  'https://graph.mainnet.iotex.io/subgraphs/name/mainnet/ins';
