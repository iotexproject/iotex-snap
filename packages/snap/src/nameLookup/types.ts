export type DomainData = {
  domains: DomainOwner[];
};

export type AccountData = {
  account: {
    wrappedDomains: Domain[];
  };
};

type DomainOwner = {
  resolvedAddress: {
    id: string;
  };
};

type Domain = {
  name: string;
};
