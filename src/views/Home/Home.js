import React, { useMemo } from 'react';
import Page from '../../components/Page';
import HomeImage from '../../assets/img/home.png';
import CashImage from '../../assets/img/crypto_tomb_cash.svg';
import BGPattern from '../../assets/img/bg_pattern.png';
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
import useTombStats from '../../hooks/useTombStats';
import useLpStats from '../../hooks/useLpStats';
import useModal from '../../hooks/useModal';
import useZap from '../../hooks/useZap';
import useBondStats from '../../hooks/useBondStats';
import usetShareStats from '../../hooks/usetShareStats';
import useTotalValueLocked from '../../hooks/useTotalValueLocked';
import { Bones as tombTesting, Bshare as tShareTesting } from '../../tomb-finance/deployments/deployments.testing.json';
import { Bones as tombProd, Bshare as tShareProd } from '../../tomb-finance/deployments/deployments.mainnet.json';

import MetamaskFox from '../../assets/img/metamask-fox.svg';

import { Box, Button, Card, CardContent, CardHeader, Container, Grid, IconButton, Paper, Typography } from '@material-ui/core';
import ZapModal from '../Bank/components/ZapModal';

import { makeStyles } from '@material-ui/core/styles';
import useBonesDao from '../../hooks/useBonesDao';
import { Link } from 'react-router-dom';

const BackgroundImage = createGlobalStyle`
  body {
    // background: url(${BGPattern}) no-repeat !important;
    // background-position: center;
    // background-size: cover !important;
    background-color: #1b459b;
  }
`;

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down('415')]: {
      marginTop: '10px',
    },
  },
  tvlCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
  },
  backgroundPattern: {
    background: `url(${BGPattern}) no-repeat`,
    backgroundSize: 'contain',
    backgroundPosition: 'bottom',
  },
  link: {
    backgroundColor: '#845EC2',
    borderRadius: '4px',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '24px',
    padding: '10px 15px',
    textDecoration: 'none',
    minWidth: '64px',
    lineHeight: '1.75',
    boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'

  }
}));

const Home = () => {
  const classes = useStyles();
  const TVL = useTotalValueLocked();
  const tombFtmLpStats = useLpStats('BONES-DOGE-LP');
  const tShareFtmLpStats = useLpStats('BSHARE-DOGE-LP');
  const tombStats = useTombStats();
  const tShareStats = usetShareStats();
  const tBondStats = useBondStats();
  const bonesDao = useBonesDao();

  let tomb;
  let tShare;
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    tomb = tombTesting;
    tShare = tShareTesting;
  } else {
    tomb = tombProd;
    tShare = tShareProd;
  }

  const buyTombAddress = 'https://dogeswap.org/#/swap?outputCurrency=' + tomb.address;
  const buyTShareAddress = 'https://dogeswap.org/#/swap?outputCurrency=' + tShare.address;

  const tombLPStats = useMemo(() => (tombFtmLpStats ? tombFtmLpStats : null), [tombFtmLpStats]);
  const tshareLPStats = useMemo(() => (tShareFtmLpStats ? tShareFtmLpStats : null), [tShareFtmLpStats]);
  const tombPriceInDollars = useMemo(
    () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
    [tombStats],
  );
  const tombPriceInFTM = useMemo(() => (tombStats ? Number(tombStats.tokenInFtm).toFixed(4) : null), [tombStats]);
  const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
  const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);

  const tSharePriceInDollars = useMemo(
    () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
    [tShareStats],
  );
  const tSharePriceInFTM = useMemo(
    () => (tShareStats ? Number(tShareStats.tokenInFtm).toFixed(4) : null),
    [tShareStats],
  );
  const tShareCirculatingSupply = useMemo(
    () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
    [tShareStats],
  );
  const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);

  const tBondPriceInDollars = useMemo(
    () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
    [tBondStats],
  );
  const tBondPriceInFTM = useMemo(() => (tBondStats ? Number(tBondStats.tokenInFtm).toFixed(4) : null), [tBondStats]);
  const tBondCirculatingSupply = useMemo(
    () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
    [tBondStats],
  );
  const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

  const tombLpZap = useZap({ depositTokenName: 'BONES-DOGE-LP' });
  const tshareLpZap = useZap({ depositTokenName: 'BSHARE-DOGE-LP' });

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
      tokenName={'BONES-DOGE-LP'}
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
      tokenName={'BSHARE-DOGE-LP'}
    />,
  );

  return (
    <Page noContainer>
      <Box className={classes.backgroundPattern} >
        <Container maxWidth="lg" style={{ paddingBottom: '4rem' }}>
          <Grid container spacing={3} justify='center'>
            {/* Tokens */}
            <Grid container item xs={12} md={6} justify='center' spacing={3}>
              <Grid className={classes.tokenContainer} container item xs={4} sm={3} md={4} justify='center' alignItems='center'>
                <Box mr={2} component='img' alt='Bones' height='32px' src={Bones} />
                <Typography variant='p'>
                  <span>{tombPriceInFTM ? tombPriceInFTM : '-.----'} DOGE</span>
                </Typography>
              </Grid>
              <Grid className={classes.tokenContainer} container item xs={4} sm={3} md={4} justify='center' alignItems='center'>
                <Box mr={2} component='img' alt='Bones' height='32px' src={Bshares} />
                <Typography variant='p'>
                  <span>{tSharePriceInFTM ? tSharePriceInFTM : '-.----'} DOGE</span>
                </Typography>
              </Grid>
              <Grid className={classes.tokenContainer} container item xs={4} sm={3} md={4} justify='center' alignItems='center'>
                <Box mr={2} component='img' alt='Bones' height='32px' src={Boneds} />
                <Typography variant='p'>
                  <span>{tBondPriceInFTM ? tBondPriceInFTM : '-.----'} DOGE</span>
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
                    <CountUp end={TVL} separator="," prefix="$" />
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* BONES */}
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
                          bonesDao.watchAssetInMetamask('BONES');
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
                          DOGE
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tombPriceInFTM ? tombPriceInFTM : '-.----'}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                          USD
                          <span style={{ color: '#121212', marginLeft: '10px' }}>
                            ${tombPriceInDollars ? tombPriceInDollars : '-.--'}
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
                          ${(tombCirculatingSupply * tombPriceInDollars).toFixed(2)}
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
                          {tombCirculatingSupply ? tombCirculatingSupply : '0'}
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
                          {tombTotalSupply ? tombTotalSupply : '0'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    target="_blank"
                    href={buyTombAddress}
                    color="secondary"
                    variant="contained"
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
                  >
                    Buy Bones
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* BSHARE */}
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
                            bonesDao.watchAssetInMetamask('BSHARE');
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
                          DOGE
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tSharePriceInFTM ? tSharePriceInFTM : '-.----'}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                          USD
                          <span style={{ color: '#121212', marginLeft: '10px' }}>
                            ${tSharePriceInDollars ? tSharePriceInDollars : '-.--'}
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
                          ${(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)}
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
                          {tShareCirculatingSupply ? tShareCirculatingSupply : '0'}
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
                          {tShareTotalSupply ? tShareTotalSupply : '0'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    target="_blank"
                    href={buyTShareAddress}
                    color="secondary"
                    variant="contained"
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
                  >
                    Buy BSHARES
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* BBOND */}
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
                            bonesDao.watchAssetInMetamask('BBOND');
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
                          DOGE
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tBondPriceInFTM ? tBondPriceInFTM : '-.----'}
                          </span>
                        </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                          USD
                          <span style={{ color: '#121212', marginLeft: '10px' }}>
                            ${tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
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
                          ${(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)}
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
                          {tBondCirculatingSupply ? tBondCirculatingSupply : '0'}
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
                          {tBondTotalSupply ? tBondTotalSupply : '0'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Button
                    href="/bond"
                    color="secondary"
                    variant="contained"
                    style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
                  >
                    Buy BBONDS
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* BONES-DOGE LP */}
            {/* <Grid item xs={12} sm={4}>
              <Card className={classes.cardContainer}>
                  <CardContent align="center" style={{ padding: '0px', }}>
                    <Grid className={classes.cardHeader} container justify='center' alignItems='center' spacing={2}>
                      <Grid item>
                        <Box component='img' alt='Bones' height='42px' src={Bones} />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTitle} variant='p' >BONES-DOGE LP</Typography>
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
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tombLPStats?.tokenAmount ? tombLPStats?.tokenAmount : '-.--'}
                          </span>
                           BONES / 
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tombLPStats?.ftmAmount ? tombLPStats?.ftmAmount : '-.--'}
                          </span>
                           DOGE
                        </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                          USD
                          <span style={{ color: '#121212', marginLeft: '10px' }}>
                            ${tombLPStats?.priceOfOne ? tombLPStats.priceOfOne : '-.--'}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container justify='center'>
                      <Grid item xs={7}>
                      <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                        Liquidity
                      </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                          ${tombLPStats?.totalLiquidity ? tombLPStats.totalLiquidity : '-.--'}
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
                          {tombLPStats?.totalSupply ? tombLPStats.totalSupply : '-.--'}
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
                    ZAP IN
                  </Button>
                </CardContent>
              </Card>
            </Grid> */}

            {/* BSHARES-DOGE LP */}
            {/* <Grid item xs={12} sm={4}>
              <Card className={classes.cardContainer}>
                  <CardContent align="center" style={{ padding: '0px', }}>
                    <Grid className={classes.cardHeader} container justify='center' alignItems='center' spacing={2}>
                      <Grid item>
                        <Box component='img' alt='Bones' height='42px' src={Bones} />
                      </Grid>
                      <Grid item>
                        <Typography className={classes.cardTitle} variant='p' >BSHARES-DOGE LP</Typography>
                      </Grid>
                    </Grid>
                    <Box mt={2}>
                    <Grid container justify='center'>
                      <Grid item xs={7}>
                      <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                        Current Price
                      </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }} display='block'>
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tshareLPStats?.tokenAmount ? tshareLPStats?.tokenAmount : '-.--'}
                          </span>
                          TSHARE / 
                          <span style={{ color: '#121212', fontSize: '2rem', marginLeft: '10px' }}>
                            {tshareLPStats?.ftmAmount ? tshareLPStats?.ftmAmount : '-.--'}
                          </span>
                          DOGE
                        </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                          USD
                          <span style={{ color: '#121212', marginLeft: '10px' }}>
                            ${tshareLPStats?.priceOfOne ? tshareLPStats.priceOfOne : '-.--'}
                          </span>
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container justify='center'>
                      <Grid item xs={7}>
                      <Typography variant='h6' style={{ fontWeight: 'bold', color: '#2425BA' }}>
                        Liquidity
                      </Typography>
                      </Grid>
                      <Grid item xs={7}  style={{ borderBottom: '2px dashed black', paddingBottom: '15px' }}>
                        <Typography variant='p' style={{ fontWeight: 'bold', fontSize: '2rem', color: '#121212' }}>
                          ${tshareLPStats?.totalLiquidity ? tshareLPStats.totalLiquidity : '-.--'}
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
                          {tshareLPStats?.totalSupply ? tshareLPStats.totalSupply : '-.--'}
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
                    ZAP IN
                  </Button>
                </CardContent>
              </Card>
            </Grid> */}

          </Grid>
        </Container>
        <Box textAlign='center' mt={11} style={{ marginBottom: '-20px' }}>
          <Box component='img' alt='bones mascot' src={MascotBones} style={{ marginBottom: '-20px' }}  height="80%" maxHeight='300px' /><br/>
          <Box component='img' alt='bones logo' src={LogoBones} width="80%" maxWidth='500px' minWidth='270px' style={{ boxShadow: '0px 30px 0px 10px #1b459b', borderRadius: '10px' }} />
        </Box>
      </Box>
      <Box pt={8} pb={10} style={{ marginTop: '-5px' }}>
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
            <Link 
              to="/boardroom"
              color="secondary"
              variant="contained"
              className={classes.link}
              // style={{ color: '#fff', fontWeight: 'bold', fontSize: '24px', padding: '0px 15px' }}
            >
              LET'S GET STARTED
            </Link>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default Home;
