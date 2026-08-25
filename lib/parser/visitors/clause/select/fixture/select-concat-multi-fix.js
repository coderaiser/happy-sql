[
    select(
        concat(
            concat(
                first_name,
                ' ',
            ),
            last_name,
        ),
        from(
            t,
        ),
    ),
];
