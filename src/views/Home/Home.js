import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import Image from 'material-ui-image';
import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { createGlobalStyle } from 'styled-components';
import CountUp from 'react-countup';
import CardIcon from '../../components/CardIcon';
import TokenSymbol from '../../components/TokenSymbol';
// import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
// import useBondStats from '../../hooks/useBondStats';
// import usetShareStats from '../../hooks/usetShareStats';
// import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { tomb as tombTesting, tShare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { tomb as tombProd, tShare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, Grid, Paper } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
// import useTombFinance from '../../hooks/useTombFinance';
import useDigitalStats from '../../hooks/useDigitalStats';
import useDigshareStats from '../../hooks/useDigshareStats';
import useDigbondStats from '../../hooks/useDigbondStats';
import useDigitalTotalValueLocked from '../../hooks/useDigitalTotalValueLocked';
import useDigitalLpStats from '../../hooks/useDigitalLpStats';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  // const TVL = useTotalValueLocked();
  const digitalTVL = useDigitalTotalValueLocked();
  const digitalBasedStats = useDigitalLpStats('DIGITAL-BASED-LP')
  const digShareFtmStats = useDigitalLpStats('DIGSHARES-FTM-LP')
  const tombFtmLpStats = useLpStats('TOMB-FTM-LP');
  const tShareFtmLpStats = useLpStats('TSHARE-FTM-LP');
  // const tombStats = useTombStats();
  // const tShareStats = usetShareStats();
  const digitalStats = useDigitalStats();
  const digshareStats = useDigshareStats();
  const digbondStats = useDigbondStats();
  // const tBondStats = useBondStats();
  // const tombFinance = useTombFinance();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  const digitalBasedLP = useMemo(() => (digitalBasedStats ? digitalBasedStats : null), [digitalBasedStats]);
  const digShareFtmLP = useMemo(() => (digShareFtmStats ? digShareFtmStats : null), [digShareFtmStats]);

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  // const tombPriceInDollars = useMemo(
  //   () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
  //   [tombStats],
  // );
  // const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  // const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  // const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  // DIGITAL
  const digitalPriceInDollars = useMemo(() => (digitalStats ? Number(digitalStats.priceInDollars).toFixed(2) : null),[digitalStats]);
  const digitalPriceInFTM = useMemo(() => (digitalStats ? Number(digitalStats.tokenInFtm).toFixed(4): null), [digitalStats]);
  const digitalCirculatingSupply = useMemo(() => (digitalStats ? String(digitalStats.circulatingSupply) : null), [digitalStats]);
  const digitalTotalSupply = useMemo(() => (digitalStats ? String(digitalStats.totalSupply) : null), [digitalStats]);

  // DIGSHARE
  const digsharePriceInDollars = useMemo(() => (digshareStats ? Number(digshareStats.priceInDollars).toFixed(2) : null), [digshareStats]);
  const digsharePriceInFTM = useMemo(() => (digshareStats ? Number(digshareStats.tokenInFtm).toFixed(4) : null), [digshareStats]);
  const digshareCirculatingSupply = useMemo(() => (digshareStats ? String(digshareStats.circulatingSupply) : null), [digshareStats]);
  const digshareTotalSupply = useMemo(() => (digshareStats ? String(digshareStats.totalSupply) : null), [digshareStats]);

  // DIGBOND
  const digbondPriceInDollars = useMemo(() => (digbondStats ? Number(digbondStats.priceInDollars).toFixed(2) : null), [digbondStats]);
  const digbondPriceInFTM = useMemo(() => (digbondStats ? Number(digbondStats.tokenInFtm).toFixed(4) : null), [digbondStats]);
  const digbondCirculatingSupply = useMemo(() => (digbondStats ? String(digbondStats.circulatingSupply) : null), [digbondStats]);
  const digbondTotalSupply = useMemo(() => (digbondStats ? String(digbondStats.totalSupply) : null), [digbondStats]);

  // const tSharePriceInDollars = useMemo(
  //   () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
  //   [tShareStats],
  // );
  // const tSharePriceInFTM = useMemo(
  //   () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
  //   [tShareStats],
  // );
  // const tShareCirculatingSupply = useMemo(
  //   () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
  //   [tShareStats],
  // );
  // const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  // const tBondPriceInDollars = useMemo(
  //   () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
  //   [tBondStats],
  // );
  // const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  // const tBondCirculatingSupply = useMemo(
  //   () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
  //   [tBondStats],
  // );
  // const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'TOMB-FTM-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'TSHARE-FTM-LP' });

  const StyledLink = styled.a`
    font-weight: 700;
    text-decoration: none;
  `;

  const [onPresentTombZap, onDissmissTombZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tombLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTombZap();
      }}
      tokenName={'TOMB-FTM-LP'}
    />,
  );

  const [onPresentTshareZap, onDissmissTshareZap] = useModal(
    <ZapModal
      decimals={18}
      onConfirm={(zappingToken, tokenName, amount) => {
        if (Number(amount) <= 0 || isNaN(Number(amount))) return;
        tshareLpZap.onZap(zappingToken, tokenName, amount);
        onDissmissTshareZap();
      }}
      tokenName={'TSHARE-FTM-LP'}
    />,
  );

  return (
    <Page>
      <BackgroundImage />
      <Grid container spacing={3}>
        {/* Logo */}
        <Grid container item xs={12} sm={4} justify="center">
          {/* <Paper>xs=6 sm=3</Paper> */}
          <Image color="none" style={{ width: '300px', paddingTop: '0px' }} src={CashImage} />
        </Grid>
        {/* Explanation text */}
        <Grid item xs={12} sm={8}>
          <Paper>
            <Box p={4}>
              <h2>Welcome to Tomb Finance</h2>
              <p>The first algorithmic stablecoin on Fantom Opera, pegged to the price of 1 FTM via seigniorage.</p>
              <p>
                Stake your TOMB-FTM LP in the Cemetery to earn TSHARE rewards.
                Then stake your earned TSHARE in the Masonry to earn more TOMB!
              </p>
            </Box>
          </Paper>



        </Grid>

        <Grid container spacing={3}>
    <Grid item  xs={12} sm={12} justify="center"  style={{ margin: '12px', display: 'flex' }}>
            <Alert variant="filled" severity="warning">
              <b>
      Please visit our <StyledLink target="_blank" href="https://docs.tomb.finance">documentation</StyledLink> before purchasing TOMB or TSHARE!</b>
            </Alert>
        </Grid>
        </Grid>

        {/* DIGITAL TVL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center">
              <h2>Total Value Locked</h2>
              <CountUp style={{ fontSize: '25px' }} end={digitalTVL} separator="," prefix="$" />
            </CardContent>
          </Card>
        </Grid>

        {/* Wallet */}
        <Grid item xs={12} sm={8}>
          <Card style={{ height: '100%' }}>
            <CardContent align="center" style={{ marginTop: '2.5%' }}>
              {/* <h2 style={{ marginBottom: '20px' }}>Wallet Balance</h2> */}
              <Button color="primary" href="/masonry" variant="contained" style={{ marginRight: '10px' }}>
                Stake Now
              </Button>
              <Button href="/cemetery" variant="contained" style={{ marginRight: '10px' }}>
                Farm Now
              </Button>
              <Button
                color="primary"
                target="_blank"
                href={buyTombAddress}
                variant="contained"
                style={{ marginRight: '10px' }}
                className={classes.button}
              >
                Buy TOMB
              </Button>
              <Button variant="contained" target="_blank" href={buyTShareAddress} className={classes.button}>
                Buy TSHARE
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* DIGITAL */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>DIGITAL</h2>
              <Button
                onClick={() => {
                  // tombFinance.watchAssetInMetamask('TOMB');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TOMB" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{digitalPriceInFTM ? digitalPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px', alignContent: 'flex-start' }}>
                  ${digitalPriceInDollars ? digitalPriceInDollars : '-.--'}
                </span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(digitalCirculatingSupply * digitalPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {digitalCirculatingSupply} <br />
                Total Supply: {digitalTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* DIGSHARE */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>DIGSHARE</h2>
              <Button
                onClick={() => {
                  // tombFinance.watchAssetInMetamask('TSHARE');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{digsharePriceInFTM ? digsharePriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${digsharePriceInDollars ? digsharePriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(digshareCirculatingSupply * digsharePriceInDollars).toFixed(2)} <br />
                Circulating Supply: {digshareCirculatingSupply} <br />
                Total Supply: {digshareTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>

        {/* DIGBOND */}
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent align="center" style={{ position: 'relative' }}>
              <h2>DIGBOND</h2>
              <Button
                onClick={() => {
                  // tombFinance.watchAssetInMetamask('TBOND');
                }}
                color="primary"
                variant="outlined"
                style={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                +&nbsp;
                <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
              </Button>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TBOND" />
                </CardIcon>
              </Box>
              Current Price
              <Box>
                <span style={{ fontSize: '30px' }}>{digbondPriceInFTM ? digbondPriceInFTM : '-.----'} FTM</span>
              </Box>
              <Box>
                <span style={{ fontSize: '16px' }}>${digbondPriceInDollars ? digbondPriceInDollars : '-.--'}</span>
              </Box>
              <span style={{ fontSize: '12px' }}>
                Market Cap: ${(digbondCirculatingSupply * digbondPriceInDollars).toFixed(2)} <br />
                Circulating Supply: {digbondCirculatingSupply} <br />
                Total Supply: {digbondTotalSupply}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>DIGITAL-BASED LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TOMB-FTM-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" disabled={true} onClick={onPresentTombZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {digitalBasedLP?.tokenAmount ? digitalBasedLP?.tokenAmount : '-.--'} DIGITAL /{' '}
                  {digitalBasedLP?.ftmAmount ? digitalBasedLP?.ftmAmount : '-.--'} BASED
                </span>
              </Box>
              <Box>${digitalBasedLP?.priceOfOne ? digitalBasedLP.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${digitalBasedLP?.totalLiquidity ? digitalBasedLP.totalLiquidity : '-.--'} <br />
                Total supply: {digitalBasedLP?.totalSupply ? digitalBasedLP.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent align="center">
              <h2>DIGSHARE-FTM LP</h2>
              <Box mt={2}>
                <CardIcon>
                  <TokenSymbol symbol="TSHARE-FTM-LP" />
                </CardIcon>
              </Box>
              <Box mt={2}>
                <Button color="primary" onClick={onPresentTshareZap} variant="contained">
                  Zap In
                </Button>
              </Box>
              <Box mt={2}>
                <span style={{ fontSize: '26px' }}>
                  {digShareFtmLP?.tokenAmount ? digShareFtmLP?.tokenAmount : '-.--'} DIGSHARE /{' '}
                  {digShareFtmLP?.ftmAmount ? digShareFtmLP?.ftmAmount : '-.--'} FTM
                </span>
              </Box>
              <Box>${digShareFtmLP?.priceOfOne ? digShareFtmLP.priceOfOne : '-.--'}</Box>
              <span style={{ fontSize: '12px' }}>
                Liquidity: ${digShareFtmLP?.totalLiquidity ? digShareFtmLP.totalLiquidity : '-.--'}
                <br />
                Total supply: {digShareFtmLP?.totalSupply ? digShareFtmLP.totalSupply : '-.--'}
              </span>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Page>
  );
};

export default Home;
