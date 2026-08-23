SELECT sum(amount) OVER (PARTITION BY kind) FROM t
