[
    update(
        t,
        set(
            x === 1,
        ),
        where(
            notInList(
                y,
                1,
                2,
                3,
            ),
        ),
    ),
];
