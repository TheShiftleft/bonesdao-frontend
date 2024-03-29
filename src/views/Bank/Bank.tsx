import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Button, Card, CardContent, Typography, Grid } from '@material-ui/core';

import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import UnlockWallet from '../../components/UnlockWallet';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useStatsForPool from '../../hooks/useStatsForPool';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../tomb-finance';
import useBonesDao from '../../hooks/useBonesDao';

const useStyles = makeStyles((theme) => ({
  gridItem: {
    height: '100%',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
  gridItemCard: {
    height: '100%',
    border: '3px solid #EC2A2A',
    backgroundColor: '#0b255b',
    borderRadius: '15px',
    [theme.breakpoints.up('md')]: {
      height: '90px',
    },
  },
  typo: {
    color: '#fff !important'
  }
}));

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));
  const classes = useStyles();
  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);
  const statsOnPool = useStatsForPool(bank);
  return account && bank ? (
    <>
      <PageHeader
        icon="🏦"
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <Box>
        <Grid container justify="center" spacing={3} style={{ marginBottom: '50px' }}>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItemCard}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography className={classes.typo}>APR</Typography>
                <Typography className={classes.typo}>{bank.closedForStaking ? '0.00' : statsOnPool?.yearlyAPR}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItemCard}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography className={classes.typo}>Daily APR</Typography>
                <Typography className={classes.typo}>{bank.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={2} lg={2} className={classes.gridItem}>
            <Card className={classes.gridItemCard}>
              <CardContent style={{ textAlign: 'center' }}>
                <Typography className={classes.typo}>TVL</Typography>
                <Typography className={classes.typo}>${statsOnPool?.TVL}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box mt={5}>
        <StyledBank>
          <StyledCardsWrapper>
            <StyledCardWrapper>
              <Harvest bank={bank} />
            </StyledCardWrapper>
            <Spacer />
            <StyledCardWrapper>
              <Stake bank={bank} />
            </StyledCardWrapper>
          </StyledCardsWrapper>
          <Spacer size="lg" />
          {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
          <Spacer size="lg" />
          {!bank.depositTokenName.includes('LP') && <div>
            <Card>
              <CardContent>
                <StyledLink href={'https://kibbleswap.dog/swap?to='+bank.depositToken.address} target="_blank">
                  {`Buy ${bank.depositTokenName} now on KibbleSwap`}
                </StyledLink>
              </CardContent>
            </Card>
            <Spacer size="lg" />
          </div>}
          <div>
            <Button onClick={onRedeem} color="secondary" style={{ color: '#fff' }} variant="contained" size='large'>
              Claim & Withdraw
            </Button>
          </div>
          <Spacer size="lg" />
        </StyledBank>
      </Box>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  const bonesDao = useBonesDao();
  const bonesAddr = bonesDao.BONES.address;
  const tbonesAddr = bonesDao.BSHARE.address;

  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('BONES')) {
    pairName = 'BONES-DOGE pair';
    uniswapUrl = 'https://kibbleswap.dog/liquidity/pool?main=wdoge&base=' + bonesAddr;
  } else {
    pairName = 'BSHARE-DOGE pair';
    uniswapUrl = 'https://kibbleswap.dog/liquidity/pool?main=wdoge&base=' + tbonesAddr;
  }
  return (
    <Card>
      <CardContent>
        <StyledLink href={uniswapUrl} target="_blank">
          {`Provide liquidity for ${pairName} now on KibbleSwap`}
        </StyledLink>
      </CardContent>
    </Card>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader icon="🏚" title="Not Found" subtitle="You've hit a bank just robbed by unicorns." />
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default Bank;
