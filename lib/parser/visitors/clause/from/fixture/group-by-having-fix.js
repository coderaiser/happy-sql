[
    select(
        kind,
        count(
            '*',
        ),
        from(
            VariableDeclaration,
            where(
                kind === 'const',
            ),
            groupBy(
                kind,
            ),
            having(
                count(
                    '*',
                ) > 1,
            ),
        ),
    ),
];
