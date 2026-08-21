[
    select(
        '*',
        from(
            t,
            where(
                a.b === 1
            )
        )
    ),
];
