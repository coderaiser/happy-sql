SELECT CASE WHEN kind = 'const' THEN 1 WHEN kind = 'let' THEN 2 ELSE 0 END
FROM t
