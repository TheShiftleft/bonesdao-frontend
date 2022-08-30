import React, { ReactNode } from 'react';
import { Box, Container } from '@material-ui/core';
import useEagerConnect from '../../hooks/useEagerConnect';

import Footer from '../Footer';
import Nav from '../Nav';

const Page = ({ children, noContainer } : { children: React.ReactNode, noContainer?: boolean }) => {
  useEagerConnect();
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Nav />
      { !noContainer ? 
        (<Container maxWidth="lg" style={{ paddingBottom: '270px', minHeight: '100vh' }}>
          {children}
        </Container>)
        :
        <Box style={{ paddingBottom: '270px' }}>
          {children}
        </Box>
      }
      <Footer />
    </div>
  );
};

export default Page;
