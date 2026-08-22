WITH RECURSIVE
    t AS (
        SELECT 1
        UNION ALL
        SELECT 2
    ),
    u(a, b) AS (
        SELECT 1, 2
        UNION ALL
        SELECT a, b
        FROM t
    )
SELECT a, b
FROM u
