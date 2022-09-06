import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Fab } from '../components/fab';
import { PageSpinner } from '../components/page-spinner';
import { useDeferredCallback } from '../hooks';
import { trpc } from '../lib/trpc';
import { getServerAuthSession } from '../server/common/get-server-auth-session';

const showSearchBarAtom = atom(false);

const Home: NextPage = () => {
  const queryClient = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(['shopping-lists.find-all']);
  const addShoppingListMutation = trpc.useMutation(['shopping-lists.add'], {
    onSuccess() {
      queryClient.invalidateQueries(['shopping-lists.find-all']);
    },
  });

  const list = React.useMemo(() => {
    return (
      <ul className='mt-5 flex flex-col px-6'>
        {data?.map(sl => (
          <li
            className='w-full border-b border-b-outline p-2 text-center last:border-b-0 dark:border-b-outline-dark'
            key={sl.id}
          >
            {sl.name}
          </li>
        ))}
      </ul>
    );
  }, [data]);

  return (
    <>
      <Head>
        <title>Quick shopping list ⚡ | Manage your lists</title>
      </Head>
      {isLoading && <PageSpinner />}
      <main className='h-[100vh]'>
        <Navbar />

        {list}
      </main>
      <Fab
        onClick={() =>
          addShoppingListMutation.mutate({ name: 'test-shopping-list' })
        }
      >
        <PlusCircleIcon />
      </Fab>
    </>
  );
};

const Navbar: React.FC = () => {
  const [showSearchBar, setShowSearchBar] = useAtom(showSearchBarAtom);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const deferredSearch = useDeferredCallback(() => {
    console.debug('ran callback');
  });
  console.debug('rendered navbar');

  return (
    <header className='border-b border-b-outline dark:border-b-outline-dark'>
      <div className='flex h-12 w-full items-center px-4'>
        <h1 className='flex-grow pl-6 text-center text-xl font-semibold'>
          Your lists
        </h1>
        <nav className='justify-self-end rounded-full'>
          <button
            className='h-6 w-6 p-1'
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            {showSearchBar ? <XMarkIcon /> : <MagnifyingGlassIcon />}
          </button>
        </nav>
      </div>
      <div
        className={classNames(
          'border-t border-t-outline px-3 transition-all dark:border-t-outline-dark',
          showSearchBar ? 'scale-1 visible p-3' : 'invisible scale-0',
        )}
      >
        {showSearchBar && (
          <input
            className='w-full bg-transparent py-2 px-3 focus:border-none focus:outline-none'
            type='text'
            placeholder='groceries'
            maxLength={30}
            ref={inputRef}
            onChange={deferredSearch}
          />
        )}
      </div>
    </header>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ctx => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: `/auth/signin?origin=${ctx.resolvedUrl}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
