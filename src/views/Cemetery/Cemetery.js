import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import { Box, Container, Typography, Grid, Card, CardContent } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
import CemeteryImage from '../../assets/img/cemetery.png';
import BGPattern from '../../assets/img/bgpattern2.png';
import { createGlobalStyle } from 'styled-components';

import useBanks from '../../hooks/useBanks';
import useRewardPoolStats from '../../hooks/useRewardPoolStats';
import { useCountdown } from '../../hooks/useCountDown';

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${BGPattern}) no-repeat !important;
    background-position: center;
    background-size: cover !important;
  }
`;

const useStyles = makeStyles(() => ({
  alertBox: {
    backgroundColor: '#757ce8',
    padding: '10px 5px !important',
  }
}));

const Cemetery = () => {
  const classes = useStyles();
  const [genesisStartTime, setGenesisStartTime] = useState(new Date(0).toUTCString())
  const [poolStartTime, setPoolStartTime] = useState(new Date(0).toUTCString())
  const [banks] = useBanks();
  const { path } = useRouteMatch();
  const { account } = useWallet();
  const activeBanks = banks.filter((bank) => !bank.finished);
  const shareRewardPoolStat = useRewardPoolStats(activeBanks.filter(bank => bank.sectionInUI === 2)[0].contract)
  const genesisRewardPoolStat = useRewardPoolStats(activeBanks.filter(bank => bank.sectionInUI === 0)[0].contract)
  const [hours, minutes, seconds] = useCountdown(poolStartTime)
  useEffect(() => {
    if(genesisRewardPoolStat) {
      const d = new Date(0)
      d.setUTCSeconds(genesisRewardPoolStat.startTime)
      setGenesisStartTime(d.toUTCString())
    }
    if(shareRewardPoolStat) {
      const sd = new Date(0)
      sd.setUTCSeconds(shareRewardPoolStat.startTime)
      setPoolStartTime(sd.toUTCString())
    }

    // setInterval(() => {
    //   const count = new Date(new Date(poolStartTime) - new Date().getTime());
    //   setCountDown(`${count.getUTCHours()}:${count.getUTCMinutes()}:${count.getUTCSeconds()}`)
    // }, 1000)

  },[genesisRewardPoolStat, shareRewardPoolStat])
  return (
    <Switch>
      <Page>
        <BackgroundImage />
          <Route exact path={path}>
            {!!account ? (            
              <Container maxWidth="lg">
                <Typography color="textPrimary" align="center" variant="h3" gutterBottom>
                  Farms
                </Typography>

                <Box mt={5}>
                  <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 2).length === 0}>
                    <Typography color="textPrimary" variant="h4" gutterBottom>
                      Earn BSHARE by staking LP
                    </Typography>
                    <Grid container>
                      <Grid item>
                        <Card style={{ marginBottom: '5px' }}>
                          <CardContent className={classes.alertBox} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <InfoOutlinedIcon style={{ marginRight: '5px' }} />
                              Pools starting at {poolStartTime}, <br />
                              BSHARE reward pools start in: {hours <= 0 ? '00' : `${hours}`}: {minutes <= 0 ? '00': `${minutes}`}: {seconds <=0 ? '00' : `${seconds}`}
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      {activeBanks
                        .filter((bank) => bank.sectionInUI === 2)
                        .map((bank) => (
                          <React.Fragment key={bank.name}>
                            <CemeteryCard bank={bank} />
                          </React.Fragment>
                        ))}
                    </Grid>
                  </div>

                  <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 1).length === 0}>
                    <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                      Earn TOMB by staking LP
                    </Typography>
                    <Alert variant="filled" severity="warning">
                      All below pools have ended. Please unstake and collect your rewards.
                    </Alert>
                    <Grid container spacing={3} style={{ marginTop: '20px' }}>
                      {activeBanks
                        .filter((bank) => bank.sectionInUI === 1)
                        .map((bank) => (
                          <React.Fragment key={bank.name}>
                            <CemeteryCard bank={bank} />
                          </React.Fragment>
                        ))}
                    </Grid>
                  </div>

                  <div hidden={activeBanks.filter((bank) => bank.sectionInUI === 0).length === 0}>
                    <Typography color="textPrimary" variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                      Genesis Pools
                    </Typography>
                    <Grid container >
                      <Grid item>
                        <Card style={{ marginBottom: '5px' }}>
                          <CardContent className={classes.alertBox} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <InfoOutlinedIcon style={{ marginRight: '5px' }} />
                              Genesis Pools will start on {genesisStartTime}
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      {activeBanks
                        .filter((bank) => bank.sectionInUI === 0)
                        .map((bank) => (
                          <React.Fragment key={bank.name}>
                            <CemeteryCard bank={bank} />
                          </React.Fragment>
                        ))}
                    </Grid>
                  </div>
                </Box>
              </Container>
            ) : (
              <UnlockWallet />
            )}
          </Route>
          <Route path={`${path}/:bankId`}>
            <Bank />
          </Route>
      </Page>
    </Switch>
  );
};

export default Cemetery;
