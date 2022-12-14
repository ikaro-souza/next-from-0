import {
  MagnifyingGlassIcon,
  PlusCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { atom, useAtom } from 'jotai';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { Fab } from '../../components/fab';
import { PageSpinner } from '../../components/page-spinner';
import { useDeferredCallback } from '../../hooks';
import { trpc } from '../../lib/trpc';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const showSearchBarAtom = atom(false);
const listFilterAtom = atom('');

const Home: NextPage = () => {
  const queryClient = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(['shopping-lists.find-all']);
  const [listFilter] = useAtom(listFilterAtom);
  const [openAddShoppingListThingy, setOpenAddShoppingListThingy] =
    React.useState(false);
  const { mutate } = trpc.useMutation(['shopping-lists.add'], {
    onSuccess() {
      queryClient.invalidateQueries(['shopping-lists.find-all']);
    },
    onMutate(newShoppingList) {
      setOpenAddShoppingListThingy(false);
      queryClient.cancelQuery(['shopping-lists.find-all']);
      queryClient.setQueryData(['shopping-lists.find-all'], old => [
        ...(old ?? []),
        newShoppingList as any,
      ]);
      return queryClient.getQueryData(['shopping-lists.find-all']);
    },
  });
  const newShoppingListRef = React.useRef<HTMLInputElement | null>(null);

  const onSubmitNewShoppingList = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      name: newShoppingListRef.current?.value ?? '',
    });
  };

  const list = React.useMemo(() => {
    return (
      <ul className='mt-5 flex flex-col px-6'>
        {data
          ?.filter(
            x =>
              x.name?.includes(listFilter) ||
              x.scheduleTo.toLocaleDateString().includes(listFilter),
          )
          .map(sl => (
            <Link key={sl.id} href={`shopping-lists/${sl.id}`}>
              <li className='w-full cursor-pointer border-b border-b-outline py-3 text-center last:border-b-0 dark:border-b-outline-dark'>
                {sl.name}
              </li>
            </Link>
          ))}
      </ul>
    );
  }, [data, listFilter]);

  return (
    <>
      <Head>
        <title>Quick shopping list ???| Manage your lists</title>
      </Head>
      {isLoading && <PageSpinner />}
      <main className='h-[100vh]'>
        <Navbar />
        {list}
        {openAddShoppingListThingy && (
          <form
            className={classNames(
              'flex w-full items-center px-6',
              openAddShoppingListThingy ? 'visible' : 'invisible',
            )}
            onSubmit={onSubmitNewShoppingList}
          >
            <input
              type='text'
              className='h-12 flex-grow border-t border-none border-t-outline bg-transparent pl-5 text-center placeholder:text-center focus:outline-none dark:border-b-outline-dark'
              autoFocus
              placeholder='new shopping list'
              maxLength={30}
              ref={newShoppingListRef}
            />
            <span
              role='button'
              className='w-5'
              onClick={() => setOpenAddShoppingListThingy(false)}
            >
              <XMarkIcon />
            </span>
            <input type='submit' hidden />
          </form>
        )}
      </main>
      <Fab onClick={() => setOpenAddShoppingListThingy(true)}>
        <PlusCircleIcon />
      </Fab>
    </>
  );
};

const Navbar: React.FC = () => {
  const [showSearchBar, setShowSearchBar] = useAtom(showSearchBarAtom);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [_, setListFilter] = useAtom(listFilterAtom);
  const deferredSearch = useDeferredCallback(() => {
    setListFilter(inputRef.current?.value ?? '');
  }, 300);

  return (
    <header className='border-b border-b-outline dark:border-b-outline-dark'>
      <div className='flex h-14 w-full items-center px-4'>
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
