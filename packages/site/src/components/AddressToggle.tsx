import { Switch } from '@headlessui/react';
import { observer } from 'mobx-react-lite';
import { globalStore } from '../store';
import styled from 'styled-components';

const Flex = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: linear-gradient(0deg, rgba(199, 207, 214, 0.15), rgba(199, 207, 214, 0.15));
`;

const SwitchItem = styled.div<{isChecked: boolean}>`
  flex: auto;
  text-align:center;
  height: 22px;
  padding: 0 4px;
  border-radius: 5px;
  line-height: 22px;
  min-width: 25px;
  cursor: pointer;
  color: ${({isChecked}) => isChecked ? "#fff" : "rgba(28, 27, 48, 0.5)"};
  background-color: ${({isChecked, theme}) => isChecked ? theme.colors.primary?.default : 'white'};
`;


export const AddressToggle = observer(() => {
  const options = [{
    label: '0x',
    value: '0x'
  }, {
    label: 'io',
    value: 'io'
  }]
  return (
    <Flex >
    {options.map((item, index) => {
      return <SwitchItem key={index} onClick={e => {
        globalStore.toggleMode()
        e.preventDefault()
        e.stopPropagation()
      }} isChecked={globalStore?.mode === item.value}>{item.label}</SwitchItem>
    })}
  </Flex>
  );
})



