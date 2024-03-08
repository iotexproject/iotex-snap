import { Dialog } from '@headlessui/react';
import { SwitchState } from '../store/utils/SwitchState';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { ModalProvider } from 'styled-react-modal';
import Modal from 'styled-react-modal';
import { Account } from './Account';
import { useEffect } from 'react';
import { generateQrCode } from '../lib/qrcode';
import { globalStore } from '../store';
import { useForm } from 'react-hook-form';

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

`;

const CancelButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary?.default};
  opacity: 1;
  border-radius: 100px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.primary?.default};
  cursor: pointer;
  height: 44px;
  min-width: 110px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px 32px;
  transition: all 0.1s ease 0s;
`;

const ConfirmButton = styled.button`
  background: ${({ theme }) => theme.colors.primary?.default};
  color: rgb(255, 255, 255);
  opacity: 1;
  border-radius: 100px;
  border-width: 2px;
  border-style: none;
  border-color: ${({ theme }) => theme.colors.primary?.default};
  cursor: pointer;
  height: 44px;
  min-width: 110px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding: 0px 26px;
  transition: all 0.1s ease 0s;
`;

const Input = styled.input`
  height: 50px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text?.default};
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(212, 212, 225);
  padding: 0 16px;
  border-radius: 8px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;


const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 328px;
`;

const Action = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;
const InputLabel = styled.label`
  display: flex;
  flex-direction: row;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: flex-end;
  height: 44px;
  line-height: 44px;
`;
const InputError = styled.p`
  color: ${({ theme }) => theme.colors.error?.default};
  font-size: 14px;
  margin: 0;
`;
export const SendModal = observer(({ store }: { store: SwitchState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <ModalProvider>
      <StyledModal
        isOpen={store.value}
        onBackgroundClick={() => store.toggle()}
        onEscapeKeydown={() => store.toggle()}
      >
        <Title>Send</Title>
        <Form
          onSubmit={handleSubmit(async (data) => {
            if (Object.keys(errors).length) {
              console.log('errors', errors)
              return
            }
            await globalStore.tokenMap.currentValue?.transfer(data.to, data.amount);
            store.close()
          })}
        >
          <FormItem>
            <InputLabel>To</InputLabel>
            <Input {...register('to', {
              required: true,
            })} />
            {errors.to && <InputError>To address is required.</InputError>}
          </FormItem>

          <FormItem>
            <InputLabel>Amount</InputLabel>
            <Input {...register('amount', {     required: true, pattern: /\d+/ })} />
            {errors.amount && <InputError>Please enter number for amount.</InputError>}
          </FormItem>
          <Action>
            <CancelButton type="button" onClick={() => {
              store.close()
            }}>CANCEL</CancelButton>
            <ConfirmButton type="submit">CONFIRM</ConfirmButton>
          </Action>
        </Form>
      </StyledModal>
    </ModalProvider>
  );
});
