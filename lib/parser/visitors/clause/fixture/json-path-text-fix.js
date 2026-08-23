[
    select([data, '#>>', '{user,name}'], from(
        users,
    )),
];
