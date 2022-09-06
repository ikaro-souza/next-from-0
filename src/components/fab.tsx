import React from 'react';

export const Fab: React.FC<
  React.PropsWithChildren<{ onClick: VoidFunction }>
> = ({ children, onClick }) => {
  return (
    <button
      className='fixed bottom-12 right-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neutral-900 text-lg text-white dark:bg-white dark:text-black-87'
      onClick={onClick}
    >
      <span className='w-6'>{children}</span>
    </button>
  );
};
