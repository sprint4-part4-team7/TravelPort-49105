import timeTableApi from '@/apis/timeTable';
import { useQuery } from '@tanstack/react-query';

const useTilmeTabaleQuery = (timeTableId: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['getTimeTable', timeTableId],
    queryFn: () => timeTableApi.getTimeTable(timeTableId),
  });

  return { data, isLoading, error, refetch };
};

export default useTilmeTabaleQuery;
