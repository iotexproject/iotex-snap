import { useContext, useEffect } from 'react';
import styled from 'styled-components';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  ConvertButton,
  Card,
  Toggle,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  isLocalSnap,
  convertAddress,
  shouldDisplayReconnectButton,
} from '../utils';
import { RadioGroup, Tab } from '@headlessui/react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { globalStore } from '../store';
import { AddressToggle } from '../components/AddressToggle';
import { Copy } from '../components/Copy';
import { SwitchState } from '../store/utils/SwitchState';
import { ReceiveModal } from '../components/RecieveModal';
import { Account } from '../components/Account';
import { SendModal } from '../components/SendModal';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.default};
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const MainCard = styled(Card)`
  overflow: auto;
`;

const TabItem = styled.div<{ active: boolean }>`
  padding: 16px;
  cursor: pointer;
  background-color: ${({ active, theme }) =>
    active ? theme.colors.background?.default : 'white'};
  position: relative;
  ::before {
    content: '';
    display: block;
    clear: both;
    height: 1px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0.2;
    background-color: ${({ theme }) => theme.colors.border?.default};
  }
  ::after {
    content: '';
    display: block;
    clear: both;
    width: ${({ active }) => (active ? '4px' : '0')};
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.colors.primary?.default};
  }
`;

const RadioOption = styled(RadioGroup.Option)`
  border-width: 0px;
`;

const MainNav = styled.div`
  position: relative;
  ::after {
    position: absolute;
    content: '';
    display: block;
    clear: both;
    width: 1px;
    opacity: 0.2;
    background-color: ${({ theme }) => theme.colors.border?.default};
    top: 0;
    bottom: 0;
    right: 0;
  }
`;

const TokenContainer = styled.div`
  overflow: auto;
  max-height: calc(100% - 200px);
  ::-webkit-scrollbar {
    width: 0px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background?.default};
    opacity: 0.1;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.background?.default};
    opacity: 0.5;
    border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.background?.default};
  }

  /* Firefox */
  * {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
`;

const Balance = styled.div`
  font-size: 40px;
  line-height: 56px;
  font-weight: 700;
  font-family: 'Roboto Bold';
`;
const BalanceUSD = styled.div`
  ont-size: 18px;
  line-height: 25.2px;
  color: rgb(127, 128, 164);
`;

const MainContent = styled.div`
  padding-top: 40px;
  flex: 1;
  text-align: center;
`;

const Action = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 24px;
  margin-bottom: 40px;
  gap: 16px;
  justify-content: center;
`;

const SendButton = styled.button`
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
  padding: 0px 26px;
  transition: all 0.1s ease 0s;
`;

const ReceiveButton = styled.button`
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

const MainContentTop = styled.div`
overflow: hidden;
position: relative;
::after {
  position: absolute;
  content: '';
  display: block;
  clear: both;
  height: 1px;
  opacity: 0.2;
  background-color: ${({ theme }) => theme.colors.border?.default};
  left: 0;
  bottom: 0;
  right: 0;
}
`

const Index = observer(() => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const store = useLocalObservable(() => ({
    isConnected: false,
    setConnected(connected: boolean) {
      store.isConnected = connected;
    },
    receiveModel: new SwitchState(false),
    sendModal: new SwitchState(false),
  }));

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleConvertClick = async () => {
    try {
      await convertAddress();
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  // useEffect(() => {
  //   handleConnectClick();
  // }, []);

  useEffect(() => {
    if (state.installedSnap) {
      globalStore.init();
    }
  }, [state.installedSnap]);

  return (
    <Container>
      {!state.installedSnap && (
        <>
          <Heading>
            Welcome to <Span>IoTeX Snap</Span>
          </Heading>
          <Subtitle>
            Get IoTeX snap and improve your DePIN experience with MetaMask.
          </Subtitle>
        </>
      )}
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {state.installedSnap && (
          <MainCard
            fullWidth
            hasBorder={false}
            maxHeight="600px"
            content={{
              description: (
                <div
                  style={{
                    display: 'flex',
                  }}
                >
                  <MainNav
                    style={{
                      width: '230px',
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontWeight: 900,
                          marginBottom: '12px',
                          fontSize: '24px',
                          marginTop: '24px',
                          textAlign: 'center',
                        }}
                      >
                        My Account
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          marginBottom: '40px',
                        }}
                      >
                        <AddressToggle></AddressToggle>
                        <Account></Account>
                      </div>
                    </div>
                    <TokenContainer>
                      <RadioGroup
                        value={globalStore.tokenMap.currentId}
                        onChange={(val) =>
                          globalStore.tokenMap.setCurrentId(val)
                        }
                      >
                        {globalStore.tokens.map((token) => (
                          <RadioOption key={token.id} value={token.id}>
                            {({ active, checked }) => (
                              <TabItem key={token.id} active={checked}>
                                <div
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                  }}
                                >
                                  <img
                                    width={24}
                                    height={24}
                                    style={{ borderRadius: '50%' }}
                                    src={token.logo}
                                    alt=""
                                  ></img>
                                  <div
                                    style={{
                                      marginLeft: '16px',
                                      overflow: 'hidden',
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontWeight: 'bold',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                      }}
                                    >
                                      {' '}
                                      {token.name}
                                    </div>
                                    <div
                                      style={{
                                        color: 'rgb(127, 128, 164)',
                                      }}
                                    >
                                      {' '}
                                      {token.balanceFormat}
                                    </div>
                                  </div>
                                </div>
                              </TabItem>
                            )}
                          </RadioOption>
                        ))}
                      </RadioGroup>
                    </TokenContainer>
                  </MainNav>
                  <MainContent>
                    <MainContentTop>
                      <Balance>
                        {globalStore.tokenMap.currentValue?.balanceFormat}
                      </Balance>
                      <BalanceUSD>
                        {globalStore.tokenMap.currentValue?.balanceUSDFormat}
                      </BalanceUSD>
                      <Action>
                        <ReceiveButton
                          onClick={() => {
                            store.receiveModel.open();
                          }}
                        >
                          Receive
                        </ReceiveButton>
                        <SendButton onClick={() => {
                          store.sendModal.open();
                        }}>Send</SendButton>
                      </Action>
                    </MainContentTop>
                    <div></div>
                  </MainContent>
                  <div></div>
                </div>
              ),
            }}
          ></MainCard>
        )}
        {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the IoTeX snap.',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}

        {/* {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )} */}
        {/* <Card
          content={{
            title: 'Show io address',
            description:
              'Display a io version of your address to easily share it with others.',
            button: (
              <ConvertButton
                onClick={handleConvertClick}
                disabled={!state.installedSnap}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        /> */}
        {/* <Notice>
          <p>
            Please note that the <b>snap.manifest.json</b> and{' '}
            <b>package.json</b> must be located in the server root directory and
            the bundle must be hosted at the location specified by the location
            field.
          </p>
        </Notice> */}
      </CardContainer>
      <ReceiveModal store={store.receiveModel}></ReceiveModal>
      <SendModal store={store.sendModal}></SendModal>
    </Container>
  );
});

export default Index;
