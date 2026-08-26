[
    select(
        a,
        from(
            t,
            where(
                b === collate(
                    c,
                    nocase,
                ),
            ),
        ),
    ),
];
