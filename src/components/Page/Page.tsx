import React, { ReactNode } from 'react';
import { Box, Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';
import { createGlobalStyle } from 'styled-components';
import BGPattern from '../../assets/img/bg_pattern.png';

import Footer from '../Footer';
import Nav from '../Nav';

const BackgroundColor = createGlobalStyle`
  body {
    background-color: #1b459b;
  }
`;


const Page = ({ children, noContainer, noNav } : { children: React.ReactNode, noContainer?: boolean, noNav?: boolean }) => {
  useEagerConnect();
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <BackgroundColor />
      {!noNav && <Nav />}
      { !noContainer ? 
        (<Container maxWidth="lg" style={{ paddingBottom: '100px', minHeight: '100vh' }}>
          {children}
        </Container>)
        :
        <Box style={{ paddingBottom: '100px' }}>
          {children}
        </Box>
      }
      <Footer />
    </div>
  );
};

export default Page;
