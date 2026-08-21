[
    select(
        u.id,
        from(
            t,
            join(
                u,
                on(
                    like(u.x, ':p')
                )
            )
        )
    ),
];
