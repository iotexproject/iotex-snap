import { expect } from '@jest/globals';
import { installSnap } from '@metamask/snaps-jest';

import { HomePanel } from '../components/HomePanel';
import {
  ConvertAddressForm,
  ConvertAddressSuccess,
} from '../components/ConvertAddress';
import { convert0xToIoAddress } from '../utils/convert';
import { ConnectedAccountsList } from '../components/ConnectedAccount';

const CONVERT_ADDRESS = 'convert-address';
const SHOW_MY_ADDRESS = 'show-my-addresses';
const FETCH_DS_PROJECTS = 'fetch-ds-projects';

describe('onHomePage', () => {
  describe('Menu', () => {
    it('returns custom UI', async () => {
      const { homeScreen } = await setup();

      expect(homeScreen).toRender(<HomePanel />);
    });
  });

  describe('List address pairs', () => {
    it('opens my converted addresses', async () => {
      const { response, homeScreen } = await setup();

      await homeScreen.clickElement(SHOW_MY_ADDRESS);

      const resultScreen = response.getInterface();
      const converted = {
        '0xc6d5a3c98ec9073b54fa0969957bd582e8d874bf': convert0xToIoAddress(
          '0xc6d5a3c98ec9073b54fa0969957bd582e8d874bf',
        )?.resolvedAddress as string,
      };
      expect(resultScreen).toRender(
        <ConnectedAccountsList addresses={converted} />,
      );

      await resultScreen.clickElement('go-back');
      const newResultScreen = response.getInterface();
      expect(newResultScreen).toRender(<HomePanel />);
    });
  });

  describe('Address converting', () => {
    const IO_ADDRESS_MOCK = 'io1ga073vrnnr20up5w8pqlu7rjs208cuaxk000k2';
    const OX_ADDRESS_MOCK = '0x475fe8b07398d4fe068e3841fe7872829e7c73a6';

    it('goes to previous page', async () => {
      const { response, homeScreen } = await setup();

      await homeScreen.clickElement(CONVERT_ADDRESS);

      const formScreen = response.getInterface();
      expect(formScreen).toRender(<ConvertAddressForm />);

      await formScreen.clickElement('go-back');
      const newResultScreen = response.getInterface();
      expect(newResultScreen).toRender(<HomePanel />);
    });
    it('converts from io to 0x', async () => {
      const { response, homeScreen } = await setup();

      await homeScreen.clickElement(CONVERT_ADDRESS);

      const formScreen = response.getInterface();
      expect(formScreen).toRender(<ConvertAddressForm />);

      await formScreen.typeInField('address', IO_ADDRESS_MOCK);

      await formScreen.clickElement('submit');

      const resultScreen = response.getInterface();
      expect(resultScreen).toRender(
        <ConvertAddressSuccess
          originalAddr={IO_ADDRESS_MOCK}
          convertedAddr={OX_ADDRESS_MOCK}
        />,
      );
    });
    it('converts from 0x to io', async () => {
      const { response, homeScreen } = await setup();

      await homeScreen.clickElement(CONVERT_ADDRESS);

      const formScreen = response.getInterface();
      expect(formScreen).toRender(<ConvertAddressForm />);

      await formScreen.typeInField('address', OX_ADDRESS_MOCK);

      await formScreen.clickElement('submit');

      const resultScreen = response.getInterface();
      expect(resultScreen).toRender(
        <ConvertAddressSuccess
          originalAddr={OX_ADDRESS_MOCK}
          convertedAddr={IO_ADDRESS_MOCK}
        />,
      );
    });
  });

  describe('DePIN Scan project fetching', () => {
    it('Should list depinscan projects', async () => {
      const { homeScreen, response } = await setup();

      await homeScreen.clickElement(FETCH_DS_PROJECTS);

      const resultScreen = response.getInterface();
      expect(resultScreen).toBeDefined();
    });
  });
});

const setup = async () => {
  const { onHomePage } = await installSnap();

  let response = await onHomePage();
  let homeScreen = response.getInterface();

  return { response, homeScreen };
};
