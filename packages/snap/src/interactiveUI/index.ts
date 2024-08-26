import type { OnUserInputHandler } from '@metamask/snaps-sdk';
import { UserInputEventType } from '@metamask/snaps-sdk';

import {
  showConvertForm,
  showMyConvertedAddresses,
  showAddrConvertResult,
  updateInterfaceToHomePage,
  fetchDepinProjects,
  showProjectInfo,
  clearDepinProjects,
  fetchDSProjects,
  showLoadingState,
  showErrorPage,
} from './ui';
import { convert0xToIoAddress, convertIoToOxAddress } from '../utils/convert';

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
        await fetchDepinProjects(id);
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
    const address = event.value['address'];

    if (!address) return;

    processSubmitedAddress(id, address as string);
  }

  if (
    event.type === UserInputEventType.InputChangeEvent &&
    event.name === 'ds-projects'
  ) {
    await showLoadingState(id);

    const projectName = event.value;
    const projects = await fetchDSProjects();
    const project = projects.find((prj) => prj.project_name === projectName);

    if (!project) {
      await showErrorPage(id, "Couldn't fetch project info");
    } else {
      showProjectInfo(id, project);
    }
  }
};

const processSubmitedAddress = async (id: string, address: string) => {
  if (!address) {
    await showAddrConvertResult(id, '', 'Invalid address');
    return;
  }

  convertAddress(id, address);
};

const convertAddress = async (id: string, address: string) => {
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
    convertedAddress || 'Invalid address',
  );
};
