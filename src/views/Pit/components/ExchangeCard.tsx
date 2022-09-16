import React from 'react';
import styled from 'styled-components';

import { Box, Button, Card } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
import CardContent from '../../../components/CardContent';
import useBonesDao from '../../../hooks/useBonesDao';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../tomb-finance/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
  disabledDescription?: string;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
  disabledDescription,
}) => {
  const catchError = useCatchError();
  const {
    contracts: { Treasury },
  } = useBonesDao();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <Card style={{ border: '3px solid #EC2A2A' }}>
      <CardContent>
        <StyledCardContentInner>
          <StyledExchanger>
            <StyledToken>
              <Box mb={3}>
                <TokenSymbol symbol={fromToken.symbol} size={64} />
              </Box>
              <Label text={fromTokenName} variant="normal" color='#2425BA' />
            </StyledToken>
            <StyledExchangeArrow>
              <FontAwesomeIcon icon={faArrowRight} />
            </StyledExchangeArrow>
            <StyledToken>
              <Box mb={3}>
                <TokenSymbol symbol={toToken.symbol} size={64} />
              </Box>
              <Label text={toTokenName} variant="normal" color='#2425BA' />
            </StyledToken>
          </StyledExchanger>
          <StyledDesc>{priceDesc}</StyledDesc>
          <StyledCardActions>
            {approveStatus !== ApprovalState.APPROVED && !disabled ? (
              <Button size='medium'
                color="secondary"
                variant="contained"
                style={{ color: '#fff' }}
                disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
                onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
              >
                {`Approve ${fromTokenName}`}
              </Button>
            ) : (
              <Button size='medium' color="secondary" style={{ color: '#fff' }} variant="contained" onClick={onPresent} disabled={disabled}>
                {disabledDescription || action}
              </Button>
            )}
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  );
};

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 100%;
`;

const StyledDesc = styled.span`
  font-weight: bold
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default ExchangeCard;
