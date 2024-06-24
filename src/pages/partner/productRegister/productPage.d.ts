import React, { Dispatch, SetStateAction } from 'react';

export type PageIdProps = {
  setPage: Dispatch<SetStateAction<React.ReactNode>>;
  setActiveStep: Dispatch<SetStateAction<number>>;
};
