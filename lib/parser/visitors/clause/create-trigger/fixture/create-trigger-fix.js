[
    createTrigger(
        t,
        afterDelete(
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
