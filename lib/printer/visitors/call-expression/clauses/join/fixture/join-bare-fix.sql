SELECT id
FROM Users
JOIN Orders ON Orders.user_id = Users.id
