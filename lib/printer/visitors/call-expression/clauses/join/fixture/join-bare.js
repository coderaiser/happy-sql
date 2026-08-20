[select(id, from(Users, join(Orders, on(Orders.user_id === Users.id))))];
