import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { trpc } from '../lib/trpc';
import { getServerAuthSession } from '../server/common/get-server-auth-session';

const Home: NextPage = () => {
  const shoppingLists = trpc.useQuery(['shopping-lists.find-all']);

  return (
    <>
      <Head>
        <title>Quick shopping list ⚡ | Manage your lists</title>
      </Head>
      <main className='h-[100vh]'>
        {shoppingLists.data?.map(sl => (
          <li key={sl.id}>{`${sl.name} @ ${sl.scheduleTo}`}</li>
        ))}
      </main>
    </>
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
