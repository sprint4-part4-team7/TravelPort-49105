import timeTableApi from '@/apis/timeTable';
import { useEffect, useState } from 'react';

type TimeTable = {
  id: number;
  productOptionId: number;
  targetDate: string;
  startTimeOnly: string;
  endTimeOnly: string;
  isReservation: boolean;
  remainCount: number;
  isDelete: boolean;
  createdAt: string;
};

const useTimeTable = (optionId: number) => {
  const [table, setTable] = useState<TimeTable[]>();

  useEffect(() => {
    const fetchTimeTable = async (optionIdNum: number) => {
      const response = await timeTableApi.getTimeTable(optionIdNum);
      setTable(response);
    };
    fetchTimeTable(optionId);
  }, [optionId]);

  return { table };
};

export default useTimeTable;
