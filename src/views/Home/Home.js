import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import MascotBones from '../../assets/img/mascot-bones.png';
import LogoBones from '../../assets/img/logo-bones_red.png';
import Bones from '../../assets/img/bones.png';
import Boneds from '../../assets/img/boneds.png';
import Bshares from '../../assets/img/bshares.png';
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

import { Box, Button, Card, CardContent, CardHeader, Container, Grid, IconButton, Paper, Typography } from '@material-ui/core';
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
  tvlCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '25px !important',
    borderRadius: '3rem',
    border: '3px solid #db1d2f',
  },
  tvlText: {
    color: '#fff',
    padding: '0px',
    fontSize: '32px',
    fontWeight: 'bold',
  },
  tokenContainer: {
    color: '#fff',
    padding: '0px',
    fontSize: '16px',
  },
  cardContainer: {
    borderRadius: '1rem',
    border: '3px solid #EC2A2A',
    paddingBottom: '16px'
  },
  cardHeader: {
    backgroundColor: '#810E0E',
    padding: '16px 16px',
    borderBottom: '3px solid #EC2A2A'
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: '24px',
    color: '#fff',
  }
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

  // const buyTombAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tomb.address;
  // const buyTShareAddress = 'https://spookyswap.finance/swap?outputCurrency=' + tShare.address;

  // DIGITAL-BASED LP STATS
  // const digitalBasedLP = useMemo(() => (digitalBasedStats ? digitalBasedStats : null), [digitalBasedStats]);
  // DIGSHARE-FTM LP STATS
  // const digShareFtmLP = useMemo(() => (digShareFtmStats ? digShareFtmStats : null), [digShareFtmStats]);

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
    <Page noContainer>
      <Container maxWidth="lg" style={{ paddingBottom: '5rem' }}>
      <BackgroundImage />
      <Grid container spacing={3} justify='center'>
        {/* Tokens */}
        <Grid container item xs={12} md={6} justify='center' spacing={3}>
          <Grid className={classes.tokenContainer} container item xs={4} sm={3} md={4} justify='center' alignItems='center'>
            <Box mr={2} component='img' alt='Bones' height='32px' src={Bones} />
            <Typography variant='p'>
              <span>{digitalPriceInFTM ? digitalPriceInFTM : '-.----'} FTM</span>
            </Typography>
          </Grid>
          <Grid className={classes.tokenContainer} container item xs={4} sm={3} md={4} justify='center' alignItems='center'>
            <Box mr={2} component='img' alt='Bones' height='32px' src={Bshares} />
            <Typography variant='p'>
              <span>{digsharePriceInFTM ? digsharePriceInFTM : '-.----'} FTM</span>
            </Typography>
          </Grid>
          <Grid className={classes.tokenContainer} container item xs={4} sm={3} md={4} justify='center' alignItems='center'>
            <Box mr={2} component='img' alt='Bones' height='32px' src={Boneds} />
            <Typography variant='p'>
              <span>{digbondPriceInFTM ? digbondPriceInFTM : '-.----'} FTM</span>
            </Typography>
          </Grid>
        </Grid>
        {/* Logo */}
        <Grid container item xs={12} justify='center' alignItems='center' spacing={3}>
          <Grid item>
            <Box component='img' alt='bones mascot' height='120px' src={MascotBones} />
          </Grid>
          {/* Explanation text */}
          <Grid className={classes.tvlCard} container alignItems='center' sm={6} md={4} item spacing={2}>
            <Grid className={classes.tvlText} container item xs={3} sm={4} md={3}>
              <Typography variant='p'>
                TVL
              </Typography>
            </Grid>
            <Grid className={classes.tvlText} container item xs={9} sm={8} md={9} >
              <Typography variant='p'>
                <CountUp end={digitalTVL} separator="," prefix="$" />
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* DIGITAL */}
        <Grid item xs={12} sm={4}>
          <Card className={classes.cardContainer}>
            <CardContent align="center" style={{ padding: '0px', }}>
              <Grid className={classes.cardHeader} container justify='center' alignItems='center' spacing={2}>
                <Grid item>
                  <Box component='img' alt='Bones' height='42px' src={Bones} />
                </Grid>
                <Grid item>
                  <Typography className={classes.cardTitle} variant='p' >BONES</Typography>
                </Grid>
                <Grid item style={{ padding: '0px' }}>
                  <Button
                    onClick={() => {
                      // tombFinance.watchAssetInMetamask('TOMB');
                    }}
                    color="secondary"
                    variant="outlined"
                    style={{ border: '2px solid', fontSize: '24px', padding: '0px 15px' }}
                  >
                    +&nbsp;
                    <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                  </Button>
                </Grid>
              </Grid>

              <Box mt={2}>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Current Price
                  </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }} display='block'>
                      FTM
                      <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                        {digitalPriceInFTM ? digitalPriceInFTM : '-.----'}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                      USD
                      <span style={{ color: '#121212', marginLeft: '10px' }}>
                        ${digitalPriceInDollars ? digitalPriceInDollars : '-.--'}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Marketing Capital
                  </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      ${(digitalCirculatingSupply * digitalPriceInDollars).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Circulating Supply
                  </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      {digitalCirculatingSupply ? digitalCirculatingSupply : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Total Supply
                  </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      {digitalTotalSupply ? digitalTotalSupply : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                onClick={() => {
                  // tombFinance.watchAssetInMetamask('TOMB');
                }}
                color="secondary"
                variant="contained"
                style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
              >
                Buy Bones
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* DIGSHARE */}
        <Grid item xs={12} sm={4}>
          <Card className={classes.cardContainer}>
              <CardContent align="center" style={{ padding: '0px', }}>
                <Grid className={classes.cardHeader} container justify='center' alignItems='center' spacing={2}>
                  <Grid item>
                    <Box component='img' alt='Bones' height='42px' src={Bshares} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.cardTitle} variant='p' >BSHARES</Typography>
                  </Grid>
                  <Grid item style={{ padding: '0px' }}>
                    <Button
                      onClick={() => {
                        // tombFinance.watchAssetInMetamask('TOMB');
                      }}
                      color="secondary"
                      variant="outlined"
                      style={{ border: '2px solid', fontSize: '24px', padding: '0px 15px' }}
                    >
                      +&nbsp;
                      <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={2}>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Current Price
                  </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }} display='block'>
                      FTM
                      <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                        {digsharePriceInFTM ? digsharePriceInFTM : '-.----'}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                      USD
                      <span style={{ color: '#121212', marginLeft: '10px' }}>
                        ${digsharePriceInDollars ? digsharePriceInDollars : '-.--'}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Marketing Capital
                  </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      ${(digshareCirculatingSupply * digsharePriceInDollars).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Circulating Supply
                  </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      {digshareCirculatingSupply ? digshareCirculatingSupply : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Total Supply
                  </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      {digshareTotalSupply ? digshareTotalSupply : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                onClick={() => {
                  // tombFinance.watchAssetInMetamask('TOMB');
                }}
                color="secondary"
                variant="contained"
                style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
              >
                Buy BSHARES
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* DIGBOND */}
        <Grid item xs={12} sm={4}>
          <Card className={classes.cardContainer}>
              <CardContent align="center" style={{ padding: '0px', }}>
                <Grid className={classes.cardHeader} container justify='center' alignItems='center' spacing={2}>
                  <Grid item>
                    <Box component='img' alt='Bones' height='42px' src={Boneds} />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.cardTitle} variant='p' >BONeDS</Typography>
                  </Grid>
                  <Grid item style={{ padding: '0px' }}>
                    <Button
                      onClick={() => {
                        // tombFinance.watchAssetInMetamask('TOMB');
                      }}
                      color="secondary"
                      variant="outlined"
                      style={{ border: '2px solid', fontSize: '24px', padding: '0px 15px' }}
                    >
                      +&nbsp;
                      <img alt="metamask fox" style={{ width: '20px' }} src={MetamaskFox} />
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={2}>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Current Price
                  </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }} display='block'>
                      FTM
                      <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                        {digbondPriceInFTM ? digbondPriceInFTM : '-.----'}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                      USD
                      <span style={{ color: '#121212', marginLeft: '10px' }}>
                        ${digbondPriceInDollars ? digbondPriceInDollars : '-.--'}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Marketing Capital
                  </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      ${(digbondCirculatingSupply * digbondPriceInDollars).toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Circulating Supply
                  </Typography>
                  </Grid>
                  <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      {digbondCirculatingSupply ? digbondCirculatingSupply : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box mb={2}>
                <Grid container justify='center'>
                  <Grid item xs={7}>
                  <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                    Total Supply
                  </Typography>
                  </Grid>
                  <Grid item xs={7}>
                    <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                      {digbondTotalSupply ? digbondTotalSupply : '0'}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Button
                onClick={() => {
                  // tombFinance.watchAssetInMetamask('TOMB');
                }}
                color="secondary"
                variant="contained"
                style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
              >
                Buy BONeDS
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      </Container>
      <Box mt={12} textAlign='center'>
        <Box component='img' alt='bones mascot' src={MascotBones} style={{ marginBottom: '-20px' }}  height="50%" maxHeight='250px' /><br/>
        <Box component='img' alt='bones logo' src={LogoBones} width="80%" maxWidth='400px' minWidth='270px' />
      </Box>
      <Box pt={8} pb={10} style={{ backgroundColor: '#1B1C92', marginTop: '-5px' }}>
        <Container maxWidth="sm">
          <Box>
            <Typography variant="h6" align='center' style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod.
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="h6" align='center' style={{ fontSize: '1.2rem', color: '#fff' }}>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          </Box>
          <Box mt={3} textAlign='center'>
            <Button 
              onClick={() => {
                // tombFinance.watchAssetInMetamask('TOMB');
              }}
              color="secondary"
              variant="contained"
              style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
            >
              LET'S GET STARTED
            </Button>
          </Box>
        </Container>
      </Box>
        {/* <Grid item xs={12} sm={6}>
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
        </Grid> */}
    </Page>
  );
};

export default Home;
