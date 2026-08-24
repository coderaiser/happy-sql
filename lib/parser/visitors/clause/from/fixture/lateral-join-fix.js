[
    select(
        '*',
        from(
            t,
            lateralJoin(
                lateralSubquery(
                    select(
                        1,
                    ),
                ) as 'sub',
            ),
        ),
    ),
];
