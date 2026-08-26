[
    select('*', from(t1, rightOuterJoin(t2, on(t1.a === t2.a)))),
];
