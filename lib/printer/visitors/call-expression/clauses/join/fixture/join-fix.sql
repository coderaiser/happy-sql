SELECT bin.id
FROM BinaryExpression AS bin
JOIN Identifier AS nan_id ON nan_id.parent_id = bin.id
AND nan_id.name = 'NaN'
