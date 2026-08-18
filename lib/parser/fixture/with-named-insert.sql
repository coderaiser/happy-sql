WITH
    call AS (
        INSERT INTO CallExpression (file, parent_id)
        VALUES (':file', ':parent_id')
        RETURNING id
    ),
    member AS (
        INSERT INTO MemberExpression (file, parent_id)
        SELECT ':file', id FROM call
        RETURNING id
    )
INSERT INTO Identifier (file, name, parent_id)
SELECT ':file', 'isNaN', id FROM member
