/* eslint-disable import-x/order */
import type { OnUserInputHandler } from '@metamask/snaps-sdk';
import { UserInputEventType } from '@metamask/snaps-sdk';

import { convert0xToIoAddress, convertIoToOxAddress } from '../utils/convert';
import {
  showConvertForm,
  showMyConvertedAddresses,
  showAddrConvertResult,
  updateInterfaceToHomePage,
  listDepinProjects,
  showProjectInfo,
  clearDepinProjects,
  fetchDSProjects,
  showLoadingState,
  showErrorPage,
} from './ui';

const convertAddress = async (id: string, address: string): Promise<void> => {
  let convertedAddress: string | undefined;

  if (address) {
    if (address.startsWith('0x')) {
      const convertResult = convert0xToIoAddress(address);
      convertedAddress = convertResult?.resolvedAddress;
    }

    if (address.startsWith('io')) {
      const convertResult = convertIoToOxAddress(address);
      convertedAddress = convertResult?.resolvedAddresses[0].resolvedAddress;
    }
  }

  await showAddrConvertResult(
    id,
    address,
    convertedAddress ?? 'Invalid address',
  );
};

const processSubmitedAddress = async (
  id: string,
  address: string,
): Promise<void> => {
  if (!address) {
    await showAddrConvertResult(id, '', 'Invalid address');
    return;
  }

  await convertAddress(id, address);
};

/**
 * Handle incoming user events coming from the MetaMask clients open interfaces.
 *
 * @param params - The event parameters.
 * @param params.id - The Snap interface ID where the event was fired.
 * @param params.event - The event object containing the event type, name and value.
 * @see https://docs.metamask.io/snaps/reference/exports/#onuserinput
 */
export const onUserInput: OnUserInputHandler = async ({ id, event }) => {
  if (event.type === UserInputEventType.ButtonClickEvent) {
    switch (event.name) {
      case 'convert-address':
        await showConvertForm(id);
        break;

      case 'show-my-addresses':
        await showMyConvertedAddresses(id);
        break;

      case 'go-back':
        await updateInterfaceToHomePage(id);
        break;

      case 'fetch-ds-projects':
        await listDepinProjects(id);
        break;

      case 'clear-ds-projects':
        await clearDepinProjects(id);
        break;

      default:
        break;
    }
  }

  if (
    event.type === UserInputEventType.FormSubmitEvent &&
    event.name === 'address-form'
  ) {
    const { address } = event.value;

    if (!address) {
      return;
    }

    await processSubmitedAddress(id, address as string);
  }

  if (
    event.type === UserInputEventType.InputChangeEvent &&
    event.name === 'ds-projects'
  ) {
    await showLoadingState(id);

    const projectName = event.value;
    const projects = await fetchDSProjects();
    const project = projects.find((prj) => prj.project_name === projectName);

    if (project) {
      await showProjectInfo(id, project);
    } else {
      await showErrorPage(id, "Couldn't fetch project info");
    }
  }
};
