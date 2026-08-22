[
    select(
        '*',
        from(
            subquery(
                select(
                    id,
                    from(
                        t,
                    ),
                ),
            ) as 'sub',
        ),
    ),
];
