import React, { createContext, useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import BonesDao from '../../tomb-finance';
import config from '../../config';

export interface BonesDaoContext {
  bonesDao?: BonesDao;
}

export const Context = createContext<BonesDaoContext>({ bonesDao: null });

export const BonesDaoProvider: React.FC = ({ children }) => {
  const { ethereum, account } = useWallet();
  const [bonesDao, setBonesDao] = useState<BonesDao>();

  useEffect(() => {
    if (!bonesDao) {
      const bones = new BonesDao(config);
      if (account) {
        // wallet was unlocked at initialization
        bones.unlockWallet(ethereum, account);
      }
      setBonesDao(bones);
    } else if (account) {
      bonesDao.unlockWallet(ethereum, account);
    }
  }, [account, ethereum, bonesDao]);

  return <Context.Provider value={{ bonesDao }}>{children}</Context.Provider>;
};
