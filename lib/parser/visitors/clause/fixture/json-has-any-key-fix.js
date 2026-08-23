[
    select(
        '*',
        from(
            users,
            where([data, '?|', array(
                    'email',
                    'name',
                )]),
        ),
    ),
];
