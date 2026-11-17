[
    createFunction(
        t_fn,
        returns(
            trigger,
        ),
        language(
            plpgsql,
        ),
        orReplace(), [
            deleteFrom(
                from(
                    x,
                ),
                where(
                    y === OLD.id,
                ),
            ),
            returnOld(),
        ],
    ),
];
