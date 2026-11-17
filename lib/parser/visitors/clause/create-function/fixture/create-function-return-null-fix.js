[
    createFunction(
        t_fn,
        returns(
            trigger,
        ),
        language(
            plpgsql,
        ), [
            deleteFrom(
                from(
                    x,
                ),
                where(
                    y === OLD.id,
                ),
            ),
            returnNull(),
        ],
    ),
];
