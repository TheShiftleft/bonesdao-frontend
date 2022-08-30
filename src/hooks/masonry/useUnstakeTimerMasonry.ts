import { useEffect, useState } from 'react';
import useBonesDao from '../useBonesDao';
import { AllocationTime } from '../../tomb-finance/types';

const useUnstakeTimerMasonry = () => {
  const [time, setTime] = useState<AllocationTime>({
    from: new Date(),
    to: new Date(),
  });
  const bonesDao = useBonesDao();

  useEffect(() => {
    if (bonesDao) {
      bonesDao.getUserUnstakeTime().then(setTime);
    }
  }, [bonesDao]);
  return time;
};

export default useUnstakeTimerMasonry;
