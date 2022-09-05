import { createProtectedRouter } from '../protected-router';

export const shoppingListsRouter = createProtectedRouter().query('find-all', {
  resolve: async ({ ctx }) => {
    const lists = ctx.prisma.shoppingList.findMany({
      where: {
        user: {
          id: ctx.session.user.id,
        },
      },
    });

    return lists;
  },
});
