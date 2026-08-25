WITH recent AS (SELECT id
FROM users
WHERE kind = 'const')
SELECT id
FROM recent
