[
    createTrigger(
        t,
        beforeDelete(
            foo,
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
