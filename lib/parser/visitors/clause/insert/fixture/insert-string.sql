INSERT INTO t (x) VALUES (:x) ON CONFLICT (x) DO UPDATE SET name = 'hello'
