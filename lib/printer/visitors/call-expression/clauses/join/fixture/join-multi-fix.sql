SELECT bin.id, arg_id.name
FROM BinaryExpression AS bin
JOIN Identifier AS nan_id ON nan_id.parent_id = bin.id
JOIN Identifier AS arg_id ON arg_id.parent_id = bin.id
