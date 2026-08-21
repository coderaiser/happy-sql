[
    select(
        bin.id,
        from(
            BinaryExpression as 'bin',
            join(
                Identifier as 'arg_id',
                on(
                    arg_id.parent_id === bin.id && arg_id.id !== bin.id,
                ),
            ),
        ),
    ),
];
