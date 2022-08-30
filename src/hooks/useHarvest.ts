import { useCallback } from 'react';
import useBonesDao from './useBonesDao';
import useHandleTransactionReceipt from './useHandleTransactionReceipt';
import { Bank } from '../tomb-finance';

const useHarvest = (bank: Bank) => {
  const bonesDao = useBonesDao();
  const handleTransactionReceipt = useHandleTransactionReceipt();

  const handleReward = useCallback(() => {
    handleTransactionReceipt(
      bonesDao.harvest(bank.contract, bank.poolId),
      `Claim ${bank.earnTokenName} from ${bank.contract}`,
    );
  }, [bank, bonesDao, handleTransactionReceipt]);

  return { onReward: handleReward };
};

export default useHarvest;
