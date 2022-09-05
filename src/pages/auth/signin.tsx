import classNames from 'classnames';
import type { GetStaticProps, NextPage } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import Head from 'next/head';
import React from 'react';

type AuthProviders = Awaited<ReturnType<typeof getProviders>>;

const SignIn: NextPage<{ providers: AuthProviders; redirectUrl?: string }> = ({
  providers,
  redirectUrl,
}) => {
  return (
    <>
      <Head>
        <title>Quick list ⚡ | Create account or sign in</title>
      </Head>
      <main className='mx-auto flex h-[100vh] w-[100vw] max-w-sm items-center justify-center'>
        <section className='mx-6 w-full px-4 py-6 text-center'>
          <h1 className='mb-4 text-3xl font-bold'>
            Welcome to
            <br />
            &nbsp;&nbsp;&nbsp;Quick list ⚡
          </h1>
          <h2 className='mb-6'>
            In order to use the app, please sign in to your account or create
            one &#128522;
          </h2>
          <div className='flex flex-col'>
            {providers &&
              Object.values(providers).map(p => (
                <SignInProviderButton
                  className='mb-2 last:mb-0'
                  key={p.id}
                  onClick={() =>
                    signIn(p.id, {
                      callbackUrl: redirectUrl,
                    })
                  }
                >
                  Continue with {p.name}
                </SignInProviderButton>
              ))}
          </div>
        </section>
      </main>
    </>
  );
};

const SignInProviderButton: React.FC<
  React.PropsWithChildren<{ className?: string; onClick: VoidFunction }>
> = ({ children, className, onClick }) => {
  className = classNames(
    'h-10 w-full rounded bg-neutral-900 py-2 px-3 font-medium text-white dark:bg-white dark:text-black-87',
    className,
  );

  return (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default SignIn;

export const getStaticProps: GetStaticProps = async ctx => {
  const providers = await getProviders();
  return {
    props: {
      providers,
      redirectUrl: ctx.params?.['origin'] ?? '/home',
    },
  };
};
