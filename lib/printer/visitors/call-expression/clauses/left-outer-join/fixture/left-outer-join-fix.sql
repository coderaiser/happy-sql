SELECT *
FROM users
LEFT OUTER JOIN orders ON users.id = orders.user_id
