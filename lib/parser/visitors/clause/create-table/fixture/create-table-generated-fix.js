[
    createTable(
        t, [
            column(
                a,
                INT,
                generatedAlwaysAs(
                    b + 1,
                    true,
                ),
            ),
        ],
    ),
    createTable(
        u, [
            column(
                a,
                INT,
                generatedAlwaysAs(
                    b * 2,
                    false,
                ),
            ),
        ],
    ),
];
