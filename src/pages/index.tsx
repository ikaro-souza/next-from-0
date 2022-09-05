import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const session = useSession();
  const shoppingListQuery = trpc.useQuery(['shopping-lists.find-all'], {
    enabled: !!session.data,
  });

  const renderShoppingLists = () => {
    if (!shoppingListQuery.data) return <></>;
    return (
      <ul>
        {shoppingListQuery.data.map(s => (
          <li key={s.id}>{`${s.name} @ ${s.createdAt}`}</li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Head>
        <title>Quick shopping list ⚡</title>
        <meta name='description' content='Quicly create shopping lists' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='h-[100vh]'>
        {!session.data && <UserNeedsToCreateAccount />}
        {shoppingListQuery.isLoading && <p>loading your shopping lists...</p>}
        {renderShoppingLists()}
      </main>
    </>
  );
};

const UserNeedsToCreateAccount: React.FC = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <section className='mx-12 w-full text-center'>
        <h3 className='mb-3 text-xl font-bold'>✋ Hold on a second ✋</h3>
        <p className='mb-6'>
          In order to use the app, first you need to create an account
        </p>
        <Link href='/api/auth/signin'>
          <a className='inline-block h-10 w-full rounded bg-neutral-900 py-2 px-3 font-medium text-white dark:bg-white dark:text-black-87'>
            Create your account
          </a>
        </Link>
      </section>
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <header className='w-full border-b border-b-[#3c3c3c] p-3'>
      <h1 className='pb-1 text-center text-2xl font-medium'>
        &nbsp;&nbsp;Quick shopping list ⚡
      </h1>
    </header>
  );
};

const BottomNavbar: React.FC = () => {
  return (
    <footer className='h-10 w-full border-t border-t-outline dark:border-t-outline-dark'>
      yep
    </footer>
  );
};

export default Home;
