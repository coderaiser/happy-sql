[
    select(id, from(t, where(inList(name, '*', 'x')))),
];
