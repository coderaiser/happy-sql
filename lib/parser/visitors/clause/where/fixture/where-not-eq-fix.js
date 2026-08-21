[
    select(
        '*',
        from(
            t,
            where(
                x !== ':y'
            )
        )
    ),
];
