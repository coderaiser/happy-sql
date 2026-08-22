SELECT kind, COUNT(*) FROM VariableDeclaration WHERE kind = 'const' GROUP BY kind HAVING COUNT(*) > 1
