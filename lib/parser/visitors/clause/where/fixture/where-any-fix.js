[
    select(
        '*',
        from(
            t,
            where(
                id === ANY(
                    array(
                        1,
                        2,
                        3,
                    ),
                ),
            ),
        ),
    ),
];
