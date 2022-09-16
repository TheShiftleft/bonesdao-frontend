import React, { useCallback, useMemo } from 'react';
import Page from '../../components/Page';
import PitImage from '../../assets/img/pit.png';
import BGPattern from '../../assets/img/bgpattern2.png';
import { createGlobalStyle } from 'styled-components';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import UnlockWallet from '../../components/UnlockWallet';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useBonesDao from '../../hooks/useBonesDao';
import useCashPriceInLastTWAP from '../../hooks/useCashPriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import useBondsPurchasable from '../../hooks/useBondsPurchasable';
import { getDisplayBalance } from '../../utils/formatBalance';
import { BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN } from '../../tomb-finance/constants';
import { Container, Grid } from '@material-ui/core';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGPattern}) no-repeat !important;
    background-size: cover !important;
  }
`;

const Pit: React.FC = () => {
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const bonesDao = useBonesDao();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useCashPriceInLastTWAP();
  const bondsPurchasable = useBondsPurchasable();

  const bondBalance = useTokenBalance(bonesDao?.BBOND);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      const tx = await bonesDao.buyBonds(amount);
      addTransaction(tx, {
        summary: `Buy ${Number(amount).toFixed(2)} BBOND with ${amount} BONES`,
      });
    },
    [bonesDao, addTransaction],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      const tx = await bonesDao.redeemBonds(amount);
      addTransaction(tx, { summary: `Redeem ${amount} BBOND` });
    },
    [bonesDao, addTransaction],
  );
  const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
  const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

  return (
    <Switch>
      <Page>
        <BackgroundImage />
        {!!account ? (
          <Container maxWidth='md'>
            <Route exact path={path}>
              <PageHeader icon={'🏦'} title="BUY & REDEEM BONDS" subtitle="Earn premiums upon redemption" />
            </Route>
            <Grid container spacing={3} justify='center'>
              <Grid item xs={12} md={5}>
                <ExchangeStat
                  tokenName="BONES"
                  description="Last-Hour TWAP Price"
                  price={getDisplayBalance(cashPrice, 18, 4)}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <ExchangeStat
                  tokenName="BBOND"
                  description="Current Price: (BONES)^2"
                  price={Number(bondStat?.tokenInFtm).toFixed(2) || '-'}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <ExchangeCard
                  action="Purchase"
                  fromToken={bonesDao.BONES}
                  fromTokenName="BONES"
                  toToken={bonesDao.BBOND}
                  toTokenName="BBOND"
                  priceDesc={
                    !isBondPurchasable
                      ? 'BONES is over peg'
                      : getDisplayBalance(bondsPurchasable, 18, 4) + ' BBOND available for purchase'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || isBondRedeemable}
                />
              </Grid>
              <Grid item xs={12} md={5}>
                <ExchangeCard
                  action="Redeem"
                  fromToken={bonesDao.BBOND}
                  fromTokenName="BBOND"
                  toToken={bonesDao.BONES}
                  toTokenName="BONES"
                  priceDesc={`${getDisplayBalance(bondBalance)} BBOND Available in wallet`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                  disabledDescription={!isBondRedeemable ? `Enabled when BONES > ${BOND_REDEEM_PRICE} DOGE` : null}
                />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <UnlockWallet />
        )}
      </Page>
    </Switch>
  );
};

export default Pit;
