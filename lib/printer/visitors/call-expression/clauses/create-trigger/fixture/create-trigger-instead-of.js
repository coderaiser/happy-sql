[
    createTrigger(
        t,
        insteadOfDelete(
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
