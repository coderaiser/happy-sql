[
    select(
        '*',
        from(
            users,
            rightJoin(
                orders,
                on(
                    users.id === orders.user_id,
                ),
            ),
        ),
    ),
];
