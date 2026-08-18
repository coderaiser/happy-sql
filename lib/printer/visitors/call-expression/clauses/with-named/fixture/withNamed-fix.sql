WITH
    call AS (
        INSERT INTO CallExpression (parent_id) VALUES (':parent_id') RETURNING id
    ),
    member AS (
        INSERT INTO MemberExpression (parent_id) SELECT id
FROM call RETURNING id
    )
INSERT INTO Identifier (name, parent_id) SELECT 'x', id
FROM member
