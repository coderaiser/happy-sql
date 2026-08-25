[
    select(
        '*',
        from(
            t,
            where([data, '??', 'key']),
        ),
    ),
];
