import React, { Suspense, lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider as TP } from '@material-ui/core/styles';
import { ThemeProvider as TP1 } from 'styled-components';
import { UseWalletProvider } from 'use-wallet';
import usePromptNetwork from './hooks/useNetworkPrompt';
import BanksProvider from './contexts/Banks';
import TombFinanceProvider from './contexts/TombFinanceProvider';
import ModalsProvider from './contexts/Modals';
import store from './state';
import theme from './theme';
import newTheme from './newTheme';
import config from './config';
import Updaters from './state/Updaters';
import Loader from './components/Loader';
import Popups from './components/Popups';
import Regulations from './views/Regulations/Regulations';
import { RefreshContextProvider } from './contexts/RefreshContext';
import BonesDaoProvider from './contexts/BonesDaoProvider';

const Home = lazy(() => import('./views/Home'));
const Cemetery = lazy(() => import('./views/Cemetery'));
const Masonry = lazy(() => import('./views/Masonry'));
const Pit = lazy(() => import('./views/Pit'));
const SBS = lazy(() => import('./views/Sbs'));
const Liquidity = lazy(() => import('./views/Liquidity'));
const ComingSoon = lazy(() => import('./views/ComingSoon'));

const NoMatch = () => (
  <h3 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
    URL Not Found. <a href="/">Go back home.</a>
  </h3>
);

const READY = true;

const App: React.FC = () => {
  // Clear localStorage for mobile users
  if (typeof localStorage.version_app === 'undefined' || localStorage.version_app !== '1.1') {
    localStorage.clear();
    localStorage.setItem('connectorId', '');
    localStorage.setItem('version_app', '1.1');
  }

  usePromptNetwork();

  return (
    <Providers>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            {
              READY ? 
              <>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/farms">
                <Cemetery />
              </Route>
              <Route path="/boardroom">
                <Masonry />
              </Route>
              <Route path="/bond">
                <Pit />
              </Route>
              
              </>
              :
              <Route exact path="/">
                <ComingSoon/>
              </Route>
            }
            <Route path="*">
                <NoMatch />
              </Route>
          </Switch>
        </Suspense>
      </Router>
    </Providers>
  );
};

const Providers: React.FC = ({ children }) => {
  return (
    <TP1 theme={theme}>
      <TP theme={newTheme}>
        <UseWalletProvider
          chainId={config.chainId}
          connectors={{
            walletconnect: { rpcUrl: config.defaultProvider },
            walletlink: {
              url: config.defaultProvider,
              appName: 'BONES DAO',
              appLogoUrl: 'https://github.com/tombfinance/tombfinance-assets/blob/master/logo_tomb_NoBG.png',
            },
          }}
        >
          <Provider store={store}>
            <Updaters />
            <RefreshContextProvider>
              <BonesDaoProvider>
                <ModalsProvider>
                  <BanksProvider>
                    <>
                      <Popups />
                      {children}
                    </>
                  </BanksProvider>
                </ModalsProvider>
              </BonesDaoProvider>
            </RefreshContextProvider>
          </Provider>
        </UseWalletProvider>
      </TP>
    </TP1>
  );
};

export default App;
