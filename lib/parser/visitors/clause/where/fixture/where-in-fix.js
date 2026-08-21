[
    select(
        '*',
        from(
            t,
            where(
                inList(x, 1, 2, 3)
            )
        )
    ),
];
