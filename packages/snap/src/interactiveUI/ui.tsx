import { convert0xToIoAddress } from '../utils/convert';
import { HomePanel } from '../components/HomePanel';
import {
  ConvertAddressForm,
  ConvertAddressSuccess,
} from '../components/ConvertAddress';
import { ConnectedAccountsList } from '../components/ConnectedAccount';

export async function createInterface(): Promise<string> {
  return await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: <HomePanel />,
    },
  });
}

export async function showConvertForm(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <ConvertAddressForm />,
    },
  });
}

export async function showMyConvertedAddresses(id: string) {
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

export async function updateInterfaceToHomePage(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePanel />,
    },
  });
}

export async function showAddrConvertResult(
  id: string,
  originalAddr: string,
  convertedAddr: string,
) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <ConvertAddressSuccess
          originalAddr={originalAddr}
          convertedAddr={convertedAddr}
        />
      ),
    },
  });
}

function buildAddressesDialog(addresses: string[]) {
  const converted: { [key: string]: string } = {};
  addresses.forEach((addr) => {
    converted[addr] = convert0xToIoAddress(addr)?.resolvedAddress ?? '';
  });

  return <ConnectedAccountsList addresses={converted} />;
}
