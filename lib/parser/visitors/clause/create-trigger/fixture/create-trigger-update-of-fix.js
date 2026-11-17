[
    createTrigger(
        t,
        afterUpdate(
            foo,
            a,
            b,
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
