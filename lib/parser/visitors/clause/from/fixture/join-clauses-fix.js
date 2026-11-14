[
    select(
        a.id,
        from(
            A as 'a',
            leftJoin(
                B as 'b',
                on(
                    b.x === a.id,
                ),
            ),
            where(
                a.k === 1,
            ),
            groupBy(
                a.id,
            ),
            having(
                count(
                    '*',
                ) > 1,
            ),
            orderBy(
                a.id,
            ),
            limit(
                10,
            ),
        ),
    ),
];
