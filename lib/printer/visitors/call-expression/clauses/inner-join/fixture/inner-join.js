[select('*', from(users, innerJoin(orders, on(users.id === orders.user_id))))];
