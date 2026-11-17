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
            deleteFrom(
                from(
                    z,
                ),
                where(
                    y === OLD.id,
                ),
            ),
            returnOld(),
        ],
    ),
];
