[
    select(
        '*',
        from(
            t,
            where(
                id > ALL(
                    1,
                    2,
                ),
            ),
        ),
    ),
];
