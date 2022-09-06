import classNames from 'classnames';
import React from 'react';

export const Backdrop: React.FC<
  React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div
      className={classNames(
        'fixed top-0 right-0 left-0 z-50 h-[100vh] w-full overflow-y-auto overflow-x-hidden bg-[#00000040]',
        className,
      )}
    >
      {children}
    </div>
  );
};
