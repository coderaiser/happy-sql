[
    createTable(
        t, [
            column(
                x,
                INT,
                check(
                    x > 0,
                ),
            ),
        ],
    ),
];
