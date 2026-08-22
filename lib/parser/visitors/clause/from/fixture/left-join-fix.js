[
    select(
        '*',
        from(
            users,
            leftJoin(
                orders,
                on(
                    users.id === orders.user_id,
                ),
            ),
        ),
    ),
];
