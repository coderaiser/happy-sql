[
    createTable(
        orders, [
            column(
                user_id,
                INT,
                references(
                    users,
                    id,
                ),
            ),
        ],
    ),
];
