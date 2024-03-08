import { Dialog } from '@headlessui/react';
import { SwitchState } from '../store/utils/SwitchState';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { ModalProvider} from 'styled-react-modal';
import Modal from 'styled-react-modal'
import { Account } from './Account';
import { useEffect } from 'react';
import { generateQrCode } from '../lib/qrcode';
import { globalStore } from '../store';

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;




const StyledModal = Modal.styled`
display: flex;
flex-direction: column;
background-color: rgb(255, 255, 255);
width: 328px;
padding: 24px;
border-radius: 8px;
-webkit-box-pack: center;
justify-content: center;
-webkit-box-align: center;
align-items: center;
gap: 24px;

`

export const ReceiveModal = observer(({ store }: { store: SwitchState }) => {
  useEffect(() => {
    if (store.value) {
      setTimeout(() => {
        generateQrCode(globalStore.wallet.account.ethAddress, 'canvas')
      })
    }

  }, [store.value])
  return (
    <ModalProvider>
      <StyledModal
        isOpen={store.value}
        onBackgroundClick={() => store.toggle()}
        onEscapeKeydown={() => store.toggle()}
      >
        <Title>Receive</Title>
        <canvas id="canvas"></canvas>
        <Account></Account>
      </StyledModal>
    </ModalProvider>
  );
});
