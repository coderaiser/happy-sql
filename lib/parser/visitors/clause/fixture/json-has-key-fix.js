[
    select(
        '*',
        from(
            users,
            where([data, '?', 'email']),
        ),
    ),
];
