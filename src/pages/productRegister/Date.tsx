import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useDatePicker from '@/hooks/useDatePicker';
import DatePickerCustom from '@/components/details/DatePickerCustom';
import { PageIdProps } from './productPage';
import Option from './Option';
import CheckButton from './CheckButton';

const Date = ({ setPage }: PageIdProps) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    maxStartDate,
    minEndDate,
  } = useDatePicker();
  const { register, watch } = useForm<any>({
    mode: 'onChange',
  });

  const [disabled, setDisabled] = useState(true);

  const holiday = watch(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']);

  useEffect(() => {
    if (endDate !== null) {
      setDisabled(false);
    }
  }, [endDate]);

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
        <div className="border p-24">
          <h3 className="flex flex-col gap-24 text-17 font-semiblod text-black-10">
            휴무일
          </h3>
          <div className="flex items-center gap-12">
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
          maxStartDate={maxStartDate}
          minEndDate={minEndDate}
          holiday={['0']}
        />
      </div>
      <CheckButton disabled={disabled} onClick={() => onSubmit()} />
    </form>
  );
};

export default Date;
