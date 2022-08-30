import { useEffect, useState } from 'react';
import useBonesDao from './useBonesDao';
import { AllocationTime } from '../tomb-finance/types';
import useRefresh from './useRefresh';


const useTreasuryAllocationTimes = () => {
  const { slowRefresh } = useRefresh();
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const bonesDao = useBonesDao();
  useEffect(() => {
    if (bonesDao) {
      bonesDao.getTreasuryNextAllocationTime().then(setTime);
    }
  }, [bonesDao, slowRefresh]);
  return time;
};

export default useTreasuryAllocationTimes;
