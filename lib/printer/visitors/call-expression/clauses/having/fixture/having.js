[
    select(
        kind,
        count(
            '*',
        ),
        from(
            VariableDeclaration,
            having(
                count(
                    '*',
                ) > 1,
            ),
        ),
    ),
];
