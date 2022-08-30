import React, { useCallback, useEffect, useState } from 'react';
import Context from './context';
import useBonesDao from '../../hooks/useBonesDao';
import { Bank } from '../../tomb-finance';
import config, { bankDefinitions } from '../../config';

const Banks: React.FC = ({ children }) => {
  const [banks, setBanks] = useState<Bank[]>([]);
  const bonesDao = useBonesDao();
  const isUnlocked = bonesDao?.isUnlocked;

  const fetchPools = useCallback(async () => {
    const banks: Bank[] = [];

    for (const bankInfo of Object.values(bankDefinitions)) {
      if (bankInfo.finished) {
        if (!bonesDao.isUnlocked) continue;

        // only show pools staked by user
        const balance = await bonesDao.stakedBalanceOnBank(
          bankInfo.contract,
          bankInfo.poolId,
          bonesDao.myAccount,
        );
        if (balance.lte(0)) {
          continue;
        }
      }
      banks.push({
        ...bankInfo,
        address: config.deployments[bankInfo.contract].address,
        depositToken: bonesDao.externalTokens[bankInfo.depositTokenName],
        earnToken: bankInfo.earnTokenName === 'BONES' ? bonesDao.BONES : bonesDao.BSHARE,
      });
    }
    banks.sort((a, b) => (a.sort > b.sort ? 1 : -1));
    setBanks(banks);
  }, [bonesDao, setBanks]);

  useEffect(() => {
    if (bonesDao) {
      fetchPools().catch((err) => console.error(`Failed to fetch pools: ${err.stack}`));
    }
  }, [isUnlocked, bonesDao, fetchPools]);

  return <Context.Provider value={{ banks }}>{children}</Context.Provider>;
};

export default Banks;
