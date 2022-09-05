import { prisma } from '../db/client';

export const createDefaultShoppingList = async (userId: string) => {
  const { id: shoppingListId } = await prisma.shoppingList.create({
    data: {
      userId,
      name: 'groceries',
    },
  });

  await prisma.shoppingItem.create({
    data: {
      shoppingListId,
      name: 'pack of monster',
      quantity: 1,
      unitaryPrice: 49.99,
    },
  });

  await prisma.shoppingItem.create({
    data: {
      shoppingListId,
      name: '2 gallons of milk',
      quantity: 3,
      unitaryPrice: 1.26,
    },
  });

  await prisma.shoppingItem.create({
    data: {
      shoppingListId,
      name: 'boxes of mac & cheese',
      quantity: 5,
      unitaryPrice: 1,
    },
  });
};
