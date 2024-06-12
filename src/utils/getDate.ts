import MONTH from '@/constants/month';

export const getDate = (timestamp: string) => {
  return timestamp.split('T')[0];
};

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

export const formatDate = (timeStamp: SelectedDate) => {
  if (!timeStamp) return '';
  const timeArray = timeStamp.toString().split(' ');
  return `${timeArray[3]}-${MONTH[timeArray[1]]}-${timeArray[2]}`;
};
