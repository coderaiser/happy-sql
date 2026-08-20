[
    select(u.id, u.name, from(users as 'u', where(u.active === true))),
];
