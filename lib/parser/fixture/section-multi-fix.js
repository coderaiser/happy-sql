[
    section('@fix', [
        update(Identifier, set(name === 'isNaN'), where(
            id === ':nan_id'
        )),
        update(BinaryExpression, set(operator === '==='), where(
            id === ':id'
        )),
    ]),
];
