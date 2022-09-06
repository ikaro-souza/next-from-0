import Link from 'next/link';
import React from 'react';

export const UserNeedsToCreateAccount: React.FC = () => {
  return (
    <div className='mx-auto flex h-full w-full max-w-sm items-center justify-center'>
      <section className='w-full px-11 text-center'>
        <h3 className='mb-3 text-xl font-bold'>✋ Hold on a second ✋</h3>
        <p className='mb-6'>
          In order to use the app, first you need to create an account
        </p>
        <Link href='/auth/signin'>
          <a className='inline-block h-10 w-full rounded bg-neutral-900 py-2 px-3 font-medium text-white dark:bg-white dark:text-black-87'>
            Create your account
          </a>
        </Link>
      </section>
    </div>
  );
};
