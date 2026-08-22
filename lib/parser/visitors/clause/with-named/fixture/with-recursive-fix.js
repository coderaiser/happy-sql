[
    withRecursive(
        numbers(
            'value',
            unionAll(
                select(
                    1,
                ),
                select(
                    value + 1,
                    from(
                        numbers,
                        where(
                            value < 10,
                        ),
                    ),
                ),
            ),
        ),
        select(
            value,
            from(
                numbers,
            ),
        ),
    ),
];
