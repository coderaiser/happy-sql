[
    insert(into(t, x, values(':x')), onConflict(x, set(x === ':x'))),
];
