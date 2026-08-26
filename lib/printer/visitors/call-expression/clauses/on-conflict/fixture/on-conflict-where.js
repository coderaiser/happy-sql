[
    insert(into(t, x, values(':x')), onConflict(x, where(y > 0), set(x === ':x'))),
];
