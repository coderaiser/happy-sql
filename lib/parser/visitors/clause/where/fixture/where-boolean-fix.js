[
    select(
        '*',
        from(
            t,
            where(
                x === true,
            ),
        ),
    ),
];
