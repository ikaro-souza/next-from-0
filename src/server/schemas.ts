import { z } from 'zod';

export const shoppingList = z.object({
  name: z.string().min(5).max(30),
  scheduleTo: z.date().optional(),
});

export type ShoppingList = z.infer<typeof shoppingList>;
