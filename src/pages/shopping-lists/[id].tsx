import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { trpc } from '../../lib/trpc';
import { getServerAuthSession } from '../../server/common/get-server-auth-session';

const ShoppingListDetails: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.useQuery(['shopping-lists.find-one', id as string], {
    enabled: !!id,
  });

  return (
    <div>
      {data?.map((d: any) => (
        <p key={d.id}>{d.name}</p>
      ))}
    </div>
  );
};

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

export default ShoppingListDetails;
