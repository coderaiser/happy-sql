[
    insert(into(t, x, values(':x')), onConflict(x, y, set(count === 1))),
];
