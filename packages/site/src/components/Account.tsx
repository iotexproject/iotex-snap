import { observer } from 'mobx-react-lite';
import { globalStore } from '../store';
import styled from 'styled-components';
import { Copy } from './Copy';

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  padding: 4px 8px;
  height: 25px;
  color: rgb(41, 42, 108);
  border-radius: 24px;
  border: 1px solid rgb(212, 212, 225);
`;

export const Account = observer(() => {
  return (
    <AccountContainer>
      {globalStore.wallet.account.shortAddress}
      <Copy value={globalStore.wallet.account.address}></Copy>
    </AccountContainer>
  );
});
