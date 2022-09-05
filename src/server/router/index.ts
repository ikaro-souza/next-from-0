// src/server/router/index.ts
import superjson from 'superjson';
import { createRouter } from '../context';
import { shoppingListsRouter } from './shopping-list';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('shopping-lists.', shoppingListsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
