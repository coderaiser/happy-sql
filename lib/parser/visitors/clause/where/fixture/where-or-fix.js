[
    select(
        '*',
        from(
            t,
            where(
                x === ':x'
                || y === ':y'
            )
        )
    ),
];
