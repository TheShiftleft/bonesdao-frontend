import { useCallback } from 'react';
import useBonesDao from './useBonesDao';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';

const useStakeToMasonry = () => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleStake = useCallback(
    (amount: string) => {
      handleTransactionReceipt(bonesDao.stakeShareToMasonry(amount), `Stake ${amount} TSHARE to the masonry`);
    },
    [bonesDao, handleTransactionReceipt],
  );
  return { onStake: handleStake };
};

export default useStakeToMasonry;
