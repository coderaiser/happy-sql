SELECT kind, COUNT(*)
FROM VariableDeclaration
HAVING COUNT(*) > 1
