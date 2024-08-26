import { Box, Dropdown, Text, Spinner } from '@metamask/snaps-sdk/jsx';

import { convert0xToIoAddress } from '../utils/convert';
import { DSProject, HomePanel } from '../components/HomePanel';
import {
  ConvertAddressForm,
  ConvertAddressSuccess,
} from '../components/ConvertAddress';
import { ConnectedAccountsList } from '../components/ConnectedAccount';
import { DEPINSCAN_API } from '../config/links';
import { ProjectInfo, DSProjectRow } from '../components/ProjectInfo';

export async function createInterface(): Promise<string> {
  return await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: <HomePanel />,
    },
  });
}

export async function fetchDepinProjects(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <Box>
          <HomePanel />

          <Spinner />
        </Box>
      ),
    },
  });

  const projects = await fetchDSProjects();
  const options = buildOptions(projects);

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <Box>
          <HomePanel />

          <Dropdown name="ds-projects">{options}</Dropdown>
        </Box>
      ),
    },
  });
}

export async function clearDepinProjects(id: string) {
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'clear',
      encrypted: false,
    },
  });

  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <Box>
          <HomePanel />
        </Box>
      ),
    },
  });
}

export async function showProjectInfo(id: string, project: DSProject) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <ProjectInfo project={project} />,
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

export async function fetchDSProjects(): Promise<DSProject[]> {
  const persistedData = await fetchDePINProjectsFromState();

  let projects: DSProject[];

  if (!persistedData?.projects) {
    projects = await fetchDePINProjectsFromAPI();
    await setDePINProjectsState(projects);
  } else {
    projects = persistedData.projects as DSProject[];
  }

  return projects;
}

export async function showLoadingState(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <Box>
          <Spinner />
        </Box>
      ),
    },
  });
}

export async function showErrorPage(id: string, msg: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <Box>
          <Text>{msg}</Text>
        </Box>
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

async function fetchDePINProjectsFromState() {
  return snap.request({
    method: 'snap_manageState',
    params: { operation: 'get', encrypted: false },
  });
}

async function fetchDePINProjectsFromAPI(): Promise<DSProject[]> {
  const res = await fetch(DEPINSCAN_API);
  return res.json();
}

async function setDePINProjectsState(projects: DSProject[]) {
  await snap.request({
    method: 'snap_manageState',
    params: {
      operation: 'update',
      newState: { projects },
      encrypted: false,
    },
  });
}

function buildOptions(projects: DSProject[]): JSX.Element[] {
  return projects.map(
    (prj: DSProject) => (<DSProjectRow project={prj} />) as JSX.Element,
  );
}
