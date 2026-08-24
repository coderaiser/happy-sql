[
    select(
        '*',
        from(
            t,
            where(
                id === ANY(
                    ':ids',
                ),
            ),
        ),
    ),
];
