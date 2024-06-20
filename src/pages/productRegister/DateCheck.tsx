import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useDatePicker from '@/hooks/useDatePicker';
import DatePickerCustom from '@/components/details/DatePickerCustom';
import { PageIdProps } from './productPage';
import Option from './Option';
import CheckButton from './CheckButton';

const DateCheck = ({ setPage }: PageIdProps) => {
  const { startDate, setStartDate, endDate, setEndDate } = useDatePicker();
  const { register, watch, setValue } = useForm<any>({
    mode: 'onChange',
  });

  const [disabled, setDisabled] = useState(true);

  const holiday = watch(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);

  useEffect(() => {
    if (endDate !== null) {
      setDisabled(false);
    }
  }, [endDate]);

  useEffect(() => {
    const holidayStore = localStorage.getItem('holiday');
    if (holidayStore) {
      const holidaySpace = holidayStore.split(',');
      const holidayList: any = [];
      holidaySpace.map((i) => {
        if (i === '0') {
          holidayList.push(['sun', 0]);
        } else if (i === '1') {
          holidayList.push(['mom', 1]);
        } else if (i === '2') {
          holidayList.push(['tue', 2]);
        } else if (i === '3') {
          holidayList.push(['wen', 3]);
        } else if (i === '4') {
          holidayList.push(['thu', 4]);
        } else if (i === '5') {
          holidayList.push(['fri', 5]);
        } else if (i === '6') {
          holidayList.push(['sat', 6]);
        }
        return '';
      });
      holidayList.map((v: any) => {
        setValue(v[0], v[1]);
        return '';
      });
    }
    const startStoredDate = localStorage.getItem('startDate');
    if (startStoredDate) {
      setStartDate(new Date(startStoredDate));
    }
    const endStoredDate = localStorage.getItem('endDate');
    if (endStoredDate) {
      setEndDate(new Date(endStoredDate));
    }
  }, []);

  const onSubmit = () => {
    if (startDate !== null && endDate !== null) {
      localStorage.setItem('startDate', startDate.toString());
      localStorage.setItem('endDate', endDate.toString());
      const saveHoliday: any = [];
      holiday.map((i: any) => {
        if (i !== false) {
          saveHoliday.push(i);
        }
        return '';
      });
      localStorage.setItem('holiday', saveHoliday.toString());
      setPage(<Option />);
    }
  };

  return (
    <form>
      <div className="mx-40">
        <div className="border p-12">
          <h3 className="flex flex-col mb-12 text-17 font-semibold text-black-10">
            휴무일
          </h3>
          <div className="w-full max-w-screen-lg grid grid-cols-2 md:grid-cols-3 desktop:grid-cols-7 text-15">
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="mon"
            >
              <input {...register('mon')} type="checkbox" id="mon" value="1" />
              월요일
            </label>
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="tue"
            >
              <input {...register('tue')} type="checkbox" id="tue" value="2" />
              화요일
            </label>
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="wed"
            >
              <input {...register('wed')} type="checkbox" id="wed" value="3" />
              수요일
            </label>
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="thu"
            >
              <input {...register('thu')} type="checkbox" id="thu" value="4" />
              목요일
            </label>
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="fri"
            >
              <input {...register('fri')} type="checkbox" id="fri" value="5" />
              금요일
            </label>
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="sat"
            >
              <input {...register('sat')} type="checkbox" id="sat" value="6" />
              토요일
            </label>
            <label
              className="flex items-center gap-8 px-8 py-4 w-100"
              htmlFor="sun"
            >
              <input {...register('sun')} type="checkbox" id="sun" value="0" />
              일요일
            </label>
          </div>
        </div>
        <DatePickerCustom
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          categoryId={1}
        />
      </div>
      <CheckButton disabled={disabled} onClick={() => onSubmit()} />
    </form>
  );
};

export default DateCheck;
