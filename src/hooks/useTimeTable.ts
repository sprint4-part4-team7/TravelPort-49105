import { useState } from 'react';
import useTilmeTabaleOptionQuery from './reactQuery/timeTable/useTilmeTabaleOptionQuery';

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

  const { data } = useTilmeTabaleOptionQuery(optionId);

  setTable(data);

  return { table };
};

export default useTimeTable;
