import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { useWallet } from 'use-wallet';
import useModal from '../../hooks/useModal';
import WalletProviderModal from '../WalletProviderModal';
import AccountModal from './AccountModal';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import { makeStyles } from '@material-ui/core/styles';

interface AccountButtonProps {
  text?: string;
}

const useStyles = makeStyles((theme) => ({
  accountButton: {
    borderRadius: '15px',
    backgroundColor: '#845EC2'
  }
}));

const AccountButton: React.FC<AccountButtonProps> = ({ text }) => {
  const { account } = useWallet();
  const classes = useStyles();
  const [onPresentAccountModal] = useModal(<AccountModal />);

  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };

  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };

  const buttonText = text ? text : 'Unlock';

  return (
    <div>
      {!account ? (
        <Button className={classes.accountButton} onClick={handleWalletProviderOpen} color="primary" variant="contained" startIcon={<AccountBalanceWalletIcon />}>
          {buttonText}
        </Button>
      ) : (
        <Button className={classes.accountButton} variant="contained"  color="primary" onClick={onPresentAccountModal} startIcon={<AccountBalanceWalletIcon />}>
          My Wallet
        </Button>
      )}

      <WalletProviderModal open={isWalletProviderOpen} handleClose={handleWalletProviderClose} />
      {/* <AccountModal open={isAccountModalOpen} handleClose={handleAccountModalClose}/> */}
    </div>
  );
};

export default AccountButton;
