[
    select(
        '*',
        from(
            t,
            where(
                x === null
            )
        )
    ),
];
