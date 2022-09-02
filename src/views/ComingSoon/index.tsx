import React from 'react';
import Page from '../../components/Page';
import BGPattern from '../../assets/img/bg_pattern.png';
import MascotBones from '../../assets/img/mascot-bones.png';
import { createGlobalStyle } from 'styled-components';

import { Box, Container, Typography } from '@material-ui/core';

const BackgroundImage = createGlobalStyle`
  body {
    // background: url(${BGPattern}) no-repeat !important;
    // background-position: center;
    // background-size: cover !important;
    background-color: #1b459b;
  }
`;

const ComingSoon = () => {

  return (
    <Page noContainer noNav noFooterMenu>
      <BackgroundImage />
      <Box pt={8} pb={10} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '-5px', backgroundImage: `url(${BGPattern})`, height: '60vh' }}>
        <Container maxWidth="sm">
          <Box style={{ textAlign: 'center' }}>
            <img alt='Mascot Bones' src={MascotBones} />
          </Box>
          <Box>
            <Typography variant="h6" align='center' style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fff' }}>
              COMING SOON
            </Typography>
          </Box>
          <Box mt={3}>
            <Typography variant="h6" align='center' style={{ fontSize: '1.2rem', color: '#fff' }}>
            We are <strong>Bones DAO</strong>, a cross-chain algorithmic peg token pegged to native chain we are deployed on. An Algorithmic Peg Token (APT) is a non-collateralized token tailored for improving price stability. The beauty of algorithmic peg tokens is that they are much more capital efficient than their collateralized cousins. <strong>Bones DAO</strong> will, with its experienced team, work towards expanding this idea of capital-efficient algorithmic peg token and build on previous iterations to expand the basis of the ecosystem.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Page>
  );
};

export default ComingSoon;
