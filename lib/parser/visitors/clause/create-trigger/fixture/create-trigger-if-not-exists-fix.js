[
    createTrigger(
        t,
        afterDelete(
            foo,
        ),
        ifNotExists(), [
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
