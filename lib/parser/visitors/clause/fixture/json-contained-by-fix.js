[
    select(
        '*',
        from(
            users,
            where([data, '<@', '{"name":"x"}']),
        ),
    ),
];
