[
    select(
        '*',
        from(
            t,
            where(
                id > ALL(
                    select(
                        id,
                        from(
                            u,
                        ),
                    ),
                ),
            ),
        ),
    ),
];
