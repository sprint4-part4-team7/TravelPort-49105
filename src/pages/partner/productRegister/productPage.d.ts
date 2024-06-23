// page를 넘겨주는 pageId에 대한 type지정
import React, { Dispatch, SetStateAction } from 'react';

export type PageIdProps = {
  setPage: Dispatch<SetStateAction<React.ReactNode>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
};
