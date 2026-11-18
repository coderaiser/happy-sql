[
    select(
        a,
        from(
            t,
            where(
                tuple(
                    x.a,
                    x.b,
                ) > tuple(
                    1,
                    2,
                ),
            ),
        ),
    ),
];
