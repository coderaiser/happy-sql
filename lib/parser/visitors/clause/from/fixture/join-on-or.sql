SELECT bin.id FROM BinaryExpression bin JOIN Identifier nan_id ON nan_id.parent_id = bin.id OR nan_id.name = 'NaN'
