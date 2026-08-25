SELECT id, sum(x) OVER w
FROM t
WINDOW w AS (ORDER BY id)
