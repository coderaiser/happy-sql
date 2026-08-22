[
    select(
        caseWhen(
            kind === 'const',
            1,
            else_(
                0,
            ),
        ) as 'flag',
        from(
            t,
        ),
    ),
];
