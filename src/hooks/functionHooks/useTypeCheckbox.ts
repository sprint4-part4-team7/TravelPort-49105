import React, { useState } from 'react';

const useTypeCheckbox = () => {
  const [checkedList, setCheckedList] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const checkedItemHandler = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!checked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
    }
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    const { checked } = e.target;
    setIsChecked(checked);
    checkedItemHandler(value, e.target.checked);
  };

  return {
    checkedList,
    isChecked,
    checkedItemHandler,
    checkHandler,
  };
};

export default useTypeCheckbox;
