[
    insert(
        into(
            e, [file, p],
            select(
                ':file',
                ':p',
                where(
                    ':x' === 0,
                ),
            ),
        ),
    ),
];
