import React from 'react';
import styled from 'styled-components';

import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

interface ExchangeStatProps {
  tokenName: string;
  description: string;
  price: string;
}
const useStyles = makeStyles((theme) => ({
  gridItemCard: {
    border: '3px solid #EC2A2A',
    backgroundColor: '#0b255b',
    borderRadius: '15px',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
}))
const ExchangeStat: React.FC<ExchangeStatProps> = ({ tokenName, description, price }) => {
  const classes = useStyles()
  return (
    <Card className={classes.gridItemCard}>
      <StyledCardContentInner>
        <StyledCardTitle>{`💰 ${tokenName} = ${price} DOGE`}</StyledCardTitle>
        <StyledDesc>{description}</StyledDesc>
      </StyledCardContentInner>
    </Card>
  );
};

const StyledCardTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledDesc = styled.span`
  color: #fff;
  text-align: center;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${(props) => props.theme.spacing[2]}px;
`;

export default ExchangeStat;
