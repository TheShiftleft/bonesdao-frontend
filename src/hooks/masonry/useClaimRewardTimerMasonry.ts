import { useEffect, useState } from 'react';
import useBonesDao from '../useBonesDao';
import { AllocationTime } from '../../tomb-finance/types';

const useClaimRewardTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const bonesDao = useBonesDao();

  useEffect(() => {
    if (bonesDao) {
      bonesDao.getUserClaimRewardTime().then(setTime);
    }
  }, [bonesDao]);
  return time;
};

export default useClaimRewardTimerMasonry;
