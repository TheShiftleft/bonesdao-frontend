import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Bank from '../Bank';

import { Box, Container, Typography, Grid } from '@material-ui/core';

import { Alert } from '@material-ui/lab';

import UnlockWallet from '../../components/UnlockWallet';
import Page from '../../components/Page';
import CemeteryCard from './CemeteryCard';
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

const Cemetery = () => {
  const currentEpoch = Math.floor(new Date() / 1000)
  const [genesisStartTime, setGenesisStartTime] = useState(new Date(0).toUTCString())
  const [poolStartTime, setPoolStartTime] = useState(new Date(0).toUTCString())
  const [genesisEnded, setGenesisEnded] = useState(false)
  const [poolEnded, setPoolEnded] = useState(false)
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
      setGenesisEnded(genesisRewardPoolStat.endTime.toNumber() < currentEpoch)
    }
    if(shareRewardPoolStat) {
      const sd = new Date(0)
      sd.setUTCSeconds(shareRewardPoolStat.startTime)
      setPoolStartTime(sd.toUTCString())
      setPoolEnded(shareRewardPoolStat.endTime.toNumber() < currentEpoch)
    }
  },[genesisRewardPoolStat, shareRewardPoolStat, currentEpoch])
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
                        {
                          shareRewardPoolStat && 
                            !(shareRewardPoolStat.endTime.toNumber() >= currentEpoch && shareRewardPoolStat.startTime.toNumber() <= currentEpoch) &&
                              <Alert variant="filled" severity="info" style={{ marginBottom: '5px', backgroundColor: '#757CE8', fontSize: '1rem'  }}>
                                {poolEnded ? (
                                  <>
                                    All below pools have ended. Please unstake and collect your rewards.
                                  </>
                                ) : (
                                  <>
                                    Pools starting at {poolStartTime}, <br />
                                    BSHARE reward pools start in: {hours <= 0 ? '00' : `${hours}`}: {minutes <= 0 ? '00': `${minutes}`}: {seconds <=0 ? '00' : `${seconds}`}
                                  </>
                                )}
                              </Alert>
                        }
                        
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
                        {genesisRewardPoolStat && (
                          <Alert variant="filled" severity="info" style={{ marginBottom: '5px', backgroundColor: '#757CE8', fontSize: '1rem'  }}>
                            {genesisEnded ? (
                              <>
                                All below pools have ended. Please unstake and collect your rewards.
                              </>
                              ) :
                              genesisRewardPoolStat && genesisRewardPoolStat.endTime.toNumber() >= currentEpoch && genesisRewardPoolStat.startTime.toNumber() <= currentEpoch ? (
                              <>
                                Genesis pools are live now.
                              </>
                              ) : (
                              <>
                                Genesis Pools will start on {genesisStartTime}
                              </>
                              )
                              }
                          </Alert>
                        )}
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
