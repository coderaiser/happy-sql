SELECT *
FROM users
RIGHT JOIN orders ON users.id = orders.user_id
