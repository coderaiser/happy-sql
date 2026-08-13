-- @fix
UPDATE Identifier
SET name = 'isNaN'
WHERE id = :nan_id;
UPDATE BinaryExpression
SET operator = '==='
WHERE id = :id;
