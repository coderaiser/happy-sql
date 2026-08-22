[
    withNamed(
        recent = select(
            id,
            from(
                users,
                where(
                    kind === 'const',
                ),
            ),
        ),
        select(
            id,
            from(
                recent,
            ),
        ),
    ),
];
