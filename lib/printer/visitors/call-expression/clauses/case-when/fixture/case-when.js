[
    select(
        caseWhen(
            kind === 'const',
            1,
            kind === 'let',
            2,
            else_(
                0,
            ),
        ),
        from(
            t,
        ),
    ),
];
