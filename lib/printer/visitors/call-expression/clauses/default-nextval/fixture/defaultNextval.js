[
    createTable(users, [
        column(id, INTEGER, defaultNextval(users_id_seq), primaryKey()),
        column(name, TEXT),
    ]),
];