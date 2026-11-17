[
    createTrigger(t, afterDelete(foo), forEachRow(), execute(fn)),
    section("@fix", deleteFrom(from(b))),
];
