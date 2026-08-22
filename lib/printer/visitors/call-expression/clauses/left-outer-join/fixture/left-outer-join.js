[select('*', from(users, leftOuterJoin(orders, on(users.id === orders.user_id))))];
