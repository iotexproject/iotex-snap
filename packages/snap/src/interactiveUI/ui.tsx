import { Box, Dropdown, Text, Spinner } from '@metamask/snaps-sdk/jsx';

import { ConnectedAccountsList } from '../components/ConnectedAccount';
import {
  ConvertAddressForm,
  ConvertAddressSuccess,
} from '../components/ConvertAddress';
import { type DSProject, HomePanel } from '../components/HomePanel';
import { ProjectInfo, DSProjectRow } from '../components/ProjectInfo';
import { DEPINSCAN_API } from '../config/links';
import { convert0xToIoAddress } from '../utils/convert';

/**
 * Initiate a new interface with the starting screen.
 *
 * @returns The Snap interface ID.
 */
export async function createInterface(): Promise<string> {
  return await snap.request({
    method: 'snap_createInterface',
    params: {
      ui: <HomePanel />,
    },
  });
}

/**
 * Initiates a fetching of the depin projects from api or snap state.
 *
 * @param id - The Snap interface ID.
 */
export async function listDepinProjects(id: string) {
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

/**
 * Clears the state of the snap.
 *
 * @param id - The Snap interface ID.
 */
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

/**
 * Shows the page with DePIN Scan project info.
 *
 * @param id - The Snap interface ID.
 * @param project - An object with DepinScan project info.
 */
export async function showProjectInfo(id: string, project: DSProject) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <ProjectInfo project={project} />,
    },
  });
}

/**
 * Update the interface with a simple form containing an input and a submit button.
 *
 * @param id - The Snap interface ID to update.
 */
export async function showConvertForm(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <ConvertAddressForm />,
    },
  });
}

/**
 * Asks user to connect addresses and then shows io/0x representation of them.
 *
 * @param id - The Snap interface ID to update.
 */
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

/**
 * Returns the user to home page.
 *
 * @param id - The Snap interface ID to update.
 */
export async function updateInterfaceToHomePage(id: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: <HomePanel />,
    },
  });
}

/**
 * Update a Snap interface to show a given value.
 *
 * @param id - The Snap interface ID to update.
 * @param originalAddr - The original address to convert.
 * @param convertedAddr - The converted address.
 */
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

/**
 * Fetches DePIN Scan projects from DePIN Scan API or snap state.
 *
 * @returns List of DePIN Scan projects.
 */
export async function fetchDSProjects(): Promise<DSProject[]> {
  const persistedData = await fetchDePINProjectsFromState();

  let projects: DSProject[];

  if (persistedData?.projects) {
    projects = persistedData.projects as DSProject[];
  } else {
    projects = await fetchDePINProjectsFromAPI();
    await setDePINProjectsState(projects);
  }

  return projects;
}

/**
 * Shows spinner.
 *
 * @param id - The Snap interface ID to update.
 */
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

/**
 * Shows error page with a message.
 *
 * @param id - The Snap interface ID to update.
 * @param errorMsg - The message to show.
 */
export async function showErrorPage(id: string, errorMsg: string) {
  await snap.request({
    method: 'snap_updateInterface',
    params: {
      id,
      ui: (
        <Box>
          <Text>{errorMsg}</Text>
        </Box>
      ),
    },
  });
}

/**
 * Shows a list of connected accounts.
 *
 * @param addresses - The list of addresses to convert.
 * @returns The list with converted addresses.
 */
function buildAddressesDialog(addresses: string[]) {
  const converted: { [key: string]: string } = {};
  addresses.forEach((addr) => {
    converted[addr] = convert0xToIoAddress(addr)?.resolvedAddress ?? '';
  });

  return <ConnectedAccountsList addresses={converted} />;
}

/**
 * Fetches DePIN Scan projects from the snap state.
 *
 * @returns List of DePIN Scan projects.
 */
async function fetchDePINProjectsFromState() {
  return snap.request({
    method: 'snap_manageState',
    params: { operation: 'get', encrypted: false },
  });
}

/**
 * Fetches DePIN Scan projects from DePIN Scan API.
 *
 * @returns List of DePIN Scan projects.
 */
async function fetchDePINProjectsFromAPI(): Promise<DSProject[]> {
  const res = await fetch(DEPINSCAN_API);
  return res.json();
}

/**
 * Saves DePIN Scan projects to the snap state.
 *
 * @param projects - List of DePIN Scan projects.
 */
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

/**
 * Builds options elements for DePIN Scan projects dropdown.
 *
 * @param projects - List of DePIN Scan projects.
 * @returns Options DePIN Scan projects.
 */
function buildOptions(projects: DSProject[]): JSX.Element[] {
  return projects.map(
    (prj: DSProject) => (<DSProjectRow project={prj} />) as JSX.Element,
  );
}
