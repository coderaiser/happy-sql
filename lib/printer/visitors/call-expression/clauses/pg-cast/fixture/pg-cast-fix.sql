SELECT *
FROM t
WHERE data @> '{}'::jsonb
