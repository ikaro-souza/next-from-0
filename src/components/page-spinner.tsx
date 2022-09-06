import React from 'react';
import { Backdrop } from './backdrop';
import { Spinner } from './spinner';

export const PageSpinner: React.FC = () => {
  return (
    <Backdrop className='flex items-center justify-center'>
      <Spinner />
    </Backdrop>
  );
};
