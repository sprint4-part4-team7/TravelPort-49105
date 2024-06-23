import calendar from '@/assets/icons/calendar.svg';
import { DetailData } from '@/constants/Types';
import { getDate } from '@/utils/GetDate';

interface SalesPeriodProps {
  product?: DetailData;
}

const SalesPeriod = ({ product }: SalesPeriodProps) => {
  return (
    <>
      <img src={calendar} alt="달력 아이콘" width={23} />
      <span className="font-normal text-15 text-black-6">
        {product && getDate(product.startDate)}~
        {product && getDate(product.endDate)}
      </span>
    </>
  );
};

export default SalesPeriod;
