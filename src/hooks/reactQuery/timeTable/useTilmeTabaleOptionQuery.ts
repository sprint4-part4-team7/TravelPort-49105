import getTimeTable from '@/apis/timeTable';
import { useQuery } from '@tanstack/react-query';

const useTilmeTabaleOptionQuery = (optionId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getTimeTable', optionId],
    queryFn: () => getTimeTable(optionId),
  });

  return { data, isLoading, error };
};

export default useTilmeTabaleOptionQuery;
