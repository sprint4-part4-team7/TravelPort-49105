import { ReservStatusType } from './types';

interface ReservStatus {
  PENDING: ReservStatusType;
  FINISHED: ReservStatusType;
  REJECTED: ReservStatusType;
  CANCELED: ReservStatusType;
  DELETED: ReservStatusType;
  REVIEWED: ReservStatusType;
}

const RESERV_STATUS: ReservStatus = {
  PENDING: 1 || null,
  FINISHED: 2,
  REJECTED: 3,
  CANCELED: 4,
  DELETED: 5,
  REVIEWED: 6,
};

export default RESERV_STATUS;
