[
    select(
        a,
        from(
            t,
            where(
                (a + 1) > 2,
            ),
        ),
    ),
];
