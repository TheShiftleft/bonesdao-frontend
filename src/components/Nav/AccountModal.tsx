import React, { useMemo } from 'react';
import styled from 'styled-components';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';

import Label from '../Label';
import Modal, { ModalProps } from '../Modal';
import ModalTitle from '../ModalTitle';
import useBonesDao from '../../hooks/useBonesDao';
import TokenSymbol from '../TokenSymbol';

const AccountModal: React.FC<ModalProps> = ({ onDismiss }) => {
  const bonesDao = useBonesDao();

  const bonesBalance = useTokenBalance(bonesDao.BONES);
  const displayBonesBalance = useMemo(() => getDisplayBalance(bonesBalance), [bonesBalance]);

  const bshareBalance = useTokenBalance(bonesDao.BSHARE);
  const displayBshareBalance = useMemo(() => getDisplayBalance(bshareBalance), [bshareBalance]);

  const bbondBalance = useTokenBalance(bonesDao.BBOND);
  const displayBbondBalance = useMemo(() => getDisplayBalance(bbondBalance), [bbondBalance]);

  return (
    <Modal>
      <ModalTitle text="My Wallet" />

      <Balances>
        <StyledBalanceWrapper>
          <TokenSymbol symbol="BONES" />
          <StyledBalance>
            <StyledValue>{displayBonesBalance}</StyledValue>
            <Label text="BONES Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="BSHARE" />
          <StyledBalance>
            <StyledValue>{displayBshareBalance}</StyledValue>
            <Label text="BSHARE Available" />
          </StyledBalance>
        </StyledBalanceWrapper>

        <StyledBalanceWrapper>
          <TokenSymbol symbol="BBOND" />
          <StyledBalance>
            <StyledValue>{displayBbondBalance}</StyledValue>
            <Label text="BBOND Available" />
          </StyledBalance>
        </StyledBalanceWrapper>
      </Balances>
    </Modal>
  );
};

const StyledValue = styled.div`
  //color: ${(props) => props.theme.color.grey[300]};
  font-size: 30px;
  font-weight: 700;
`;

const StyledBalance = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const Balances = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledBalanceWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 ${(props) => props.theme.spacing[3]}px;
`;

export default AccountModal;
