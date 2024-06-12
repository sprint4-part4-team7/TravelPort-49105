import timeTableApi from '@/apis/timeTable';
import { useQuery } from '@tanstack/react-query';

const useTilmeTabaleOptionQuery = (optionId: number) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getTimeTable', optionId],
    queryFn: () => timeTableApi.getTimeTableProductOption(optionId),
  });

  return { data, isLoading, error };
};

export default useTilmeTabaleOptionQuery;
