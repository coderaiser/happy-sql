[
    createTrigger(
        t,
        beforeInsert(
            foo,
        ), [
            deleteFrom(
                from(
                    x,
                ),
                where(
                    y === NEW.id,
                ),
            ),
        ],
    ),
];
