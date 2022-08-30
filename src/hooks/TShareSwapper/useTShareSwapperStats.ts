import { useEffect, useState } from 'react';
import useBonesDao from '../useBonesDao';
import { TShareSwapperStat } from '../../tomb-finance/types';
import useRefresh from '../useRefresh';

const useTShareSwapperStats = (account: string) => {
  const [stat, setStat] = useState<TShareSwapperStat>();
  const { fastRefresh/*, slowRefresh*/ } = useRefresh();
  const bonesDao = useBonesDao();

  useEffect(() => {
    async function fetchTShareSwapperStat() {
      try{
        if(bonesDao.myAccount) {
          setStat(await bonesDao.getTShareSwapperStat(account));
        }
      }
      catch(err){
        console.error(err);
      }
    }
    fetchTShareSwapperStat();
  }, [setStat, bonesDao, fastRefresh, account]);

  return stat;
};

export default useTShareSwapperStats;