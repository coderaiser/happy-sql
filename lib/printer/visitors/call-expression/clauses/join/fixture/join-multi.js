[select(bin.id, arg_id.name, from(BinaryExpression as 'bin', join(Identifier as 'nan_id', on(nan_id.parent_id === bin.id)), join(Identifier as 'arg_id', on(arg_id.parent_id === bin.id))))];
