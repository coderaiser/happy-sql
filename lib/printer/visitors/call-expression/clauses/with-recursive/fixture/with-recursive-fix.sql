WITH RECURSIVE
    numbers(value) AS (
        SELECT 1
        UNION ALL
        SELECT value + 1
        FROM numbers
        WHERE value < 10
    )
SELECT value
FROM numbers
