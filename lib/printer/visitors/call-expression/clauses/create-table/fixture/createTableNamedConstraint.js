[
    createTable(
        t, [
            column(
                a,
                INT,
            ),
            constraint(
                pk,
                tablePrimaryKey(a),
            ),
        ],
    ),
];
