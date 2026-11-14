SELECT a.id
FROM A a
JOIN B b ON b.x = a.id
WHERE a.file = :file AND b.k = 1
