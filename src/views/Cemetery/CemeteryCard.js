import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Card, CardActions, CardContent, Typography, Grid } from '@material-ui/core';

import TokenSymbol from '../../components/TokenSymbol';

const CemeteryCard = ({ bank }) => {
  return (
    <Grid item xs={12} md={4} lg={4}>
      <Card variant="outlined" style={{ border: '3px solid #EC2A2A' }}>
        <CardContent>
          <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <TokenSymbol size={32} symbol={bank.depositTokenName} />
            <Typography variant="h5" style={{ color: '#2425BA', fontWeight: 'bold' }}>
              {bank.depositTokenName}
            </Typography>
            <Typography color="textSecondary" style={{ fontWeight: 'bold' }}>
              {/* {bank.name} */}
              Deposit {bank.depositTokenName.toUpperCase()} Earn {` ${bank.earnTokenName}`}
            </Typography>
          </Box>
        </CardContent>
        <CardActions style={{ justifyContent: 'center', padding: '15px' }}>
          <Button color="secondary" style={{ color: '#fff', fontWeight: 'bold' }} size="medium" variant="contained" component={Link} to={`/farms/${bank.contract}`}>
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CemeteryCard;
