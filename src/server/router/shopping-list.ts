import { z } from 'zod';
import { createProtectedRouter } from '../protected-router';
import { shoppingList } from '../schemas';

export const shoppingListsRouter = createProtectedRouter()
  .query('find-all', {
    resolve: async ({ ctx }) => {
      const lists = ctx.prisma.shoppingList.findMany({
        where: {
          user: {
            id: ctx.session.user.id,
          },
        },
        orderBy: {
          scheduleTo: 'desc',
        },
      });

      return lists;
    },
  })
  .query('find-one', {
    input: z.string(),
    resolve: async ({ ctx, input }) => {
      const shoppingList = await ctx.prisma.shoppingList.findFirstOrThrow({
        where: {
          id: input,
          user: {
            id: ctx.session.user.id,
          },
        },
        include: {
          items: true,
        },
      });

      return (shoppingList as any).items;
    },
  })
  .mutation('add', {
    input: shoppingList,
    resolve: async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;

      return ctx.prisma.shoppingList.create({
        data: {
          userId,
          ...input,
        },
      });
    },
  });
