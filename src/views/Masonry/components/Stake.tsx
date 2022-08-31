import React, { useMemo } from 'react';
import styled from 'styled-components';

import { Box, Button, Card, CardContent, Typography } from '@material-ui/core';

// import Button from '../../../components/Button';
// import Card from '../../../components/Card';
// import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useWithdrawCheck from '../../../hooks/masonry/useWithdrawCheck';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import ProgressCountdown from './../components/ProgressCountdown';
import useStakedBalanceOnMasonry from '../../../hooks/useStakedBalanceOnMasonry';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useUnstakeTimerMasonry from '../../../hooks/masonry/useUnstakeTimerMasonry';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToMasonry from '../../../hooks/useStakeToMasonry';
import useWithdrawFromMasonry from '../../../hooks/useWithdrawFromMasonry';
import useBonesDao from '../../../hooks/useBonesDao';

const Stake: React.FC = () => {
  const bonesDao = useBonesDao();
  const [approveStatus, approve] = useApprove(bonesDao.BSHARE, bonesDao.contracts.Masonry.address);

  const tokenBalance = useTokenBalance(bonesDao.BSHARE);
  const stakedBalance = useStakedBalanceOnMasonry();
  const { from, to } = useUnstakeTimerMasonry();

  const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('BSHARE', bonesDao.BSHARE);
  const tokenPriceInDollars = useMemo(
    () =>
      stakedTokenPriceInDollars
        ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
        : null,
    [stakedTokenPriceInDollars, stakedBalance],
  );
  // const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToMasonry();
  const { onWithdraw } = useWithdrawFromMasonry();
  const canWithdrawFromMasonry = useWithdrawCheck();

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'BShare'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'BShare'}
    />,
  );

  return (
    <Box>
      <Card style={{ border: '3px solid #EC2A2A' }}>
        <CardContent>
          <StyledCardContentInner>
            <StyledCardHeader>
              <CardIcon>
                <TokenSymbol symbol="BSHARE" />
              </CardIcon>
              <Value value={getDisplayBalance(stakedBalance)} />
              <Label text={`≈ $${tokenPriceInDollars}`} />
              <Label text={'BSHARE Staked'} />
            </StyledCardHeader>
            <StyledCardActions>
              {approveStatus !== ApprovalState.APPROVED ? (
                <Button
                  disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                  variant="contained"
                  color="secondary"
                  style={{ marginTop: '20px', color: '#fff' }}
                  onClick={approve}
                >
                  Approve BSHARE
                </Button>
              ) : (
                <>
                  <IconButton disabled={!canWithdrawFromMasonry} onClick={onPresentWithdraw}>
                    <RemoveIcon />
                  </IconButton>
                  <StyledActionSpacer />
                  <IconButton onClick={onPresentDeposit}>
                    <AddIcon />
                  </IconButton>
                </>
              )}
            </StyledCardActions>
          </StyledCardContentInner>
        </CardContent>
      </Card>
      <Box mt={2} style={{ color: '#FFF' }}>
        {canWithdrawFromMasonry ? (
          ''
        ) : (
          <Card style={{ border: '3px solid #EC2A2A' }}>
            <CardContent>
              <Typography style={{ textAlign: 'center' }}>Withdraw possible in</Typography>
              <ProgressCountdown hideBar={true} base={from} deadline={to} description="Withdraw available in" />
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
  width: 100%;
`;

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

export default Stake;
