SELECT bin.id, arg_id.name
FROM BinaryExpression bin
JOIN Identifier nan_id ON nan_id.parent_id = bin.id
JOIN Identifier arg_id ON arg_id.parent_id = bin.id
