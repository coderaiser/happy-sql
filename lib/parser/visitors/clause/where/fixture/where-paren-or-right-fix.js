[
    select(
        id,
        from(
            t,
            where(
                a === 1 && (b === 2 || c === 3),
            ),
        ),
    ),
];
