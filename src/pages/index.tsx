import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Quick list ⚡</title>
        <meta name='description' content='Quickly create shopping lists' />
      </Head>

      <main className='px-4 py-8'>
        <section className='mb-8'>
          <h1 className='mb-4 text-4xl font-bold'>
            Welcome to <br />
            Quick list ⚡
          </h1>
          <h2 className='text-xl'>
            Quickly create and manage your shopping lists. It&apos;s as simple
            as that.
          </h2>
        </section>

        <section>
          <p className='mb-3'>
            To start organizing your shopping lists, please create an account.
          </p>
          <Link href='auth/signin'>
            <button className='h-12 w-full rounded py-2 text-center text-lg font-medium text-black-87 dark:bg-white'>
              Create your account
            </button>
          </Link>
        </section>
      </main>
    </>
  );
};

export default Index;
