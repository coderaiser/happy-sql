[
    select(
        a.id,
        from(
            A as 'a',
            join(
                B as 'b',
                on(
                    b.x === a.id,
                ),
            ),
            where(
                a.file === ':file' && b.k === 1,
            ),
        ),
    ),
];
