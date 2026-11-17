[
    createTrigger(
        t,
        afterDelete(
            foo,
        ),
        forEachRow(),
        when(
            OLD.a === 1,
        ), [
            deleteFrom(
                from(
                    x,
                ),
                where(
                    y === OLD.id,
                ),
            ),
        ],
    ),
];
