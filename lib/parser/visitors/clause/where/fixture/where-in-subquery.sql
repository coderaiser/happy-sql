SELECT id FROM t WHERE id IN (SELECT user_id FROM orders)
