# Happy Sql [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL]

[NPMURL]: https://npmjs.org/package/happy-sql "npm"
[NPMIMGURL]: https://img.shields.io/npm/v/happy-sql.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/happy-sql/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/happy-sql/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"

<img width="600" height="428" alt="image" src="https://github.com/user-attachments/assets/aefbd055-957e-4de3-aca5-c30e5e3ee3f9" />

Write SQL as JavaScript function calls: parse, print, convert.

SQL written as JS lives in `.js` files it gets linted, formatted, and transformed by standard tooling. **Happy Sql** is the engine that converts between the two representations and exposes the underlying AST for tools that need it.

## Install

```
npm i happy-sql
```

## CLI

The CLI reads from stdin and auto-detects direction: SQL in → JS out, JS in → SQL out.

```sh
# SQL → JS
echo "SELECT * FROM users WHERE id = :id" | happy-sql
# [
#     select('*', from(users), where(id === ':id')),
# ];
# JS → SQL (pipe the output back)
echo "[\n    select('*', from(users), where(id === ':id')),\n];" | happy-sql
# SELECT *
# FROM users
# WHERE id = :id
```

## API

```js
import {
    convertSqlToJs,
    convertJsToSql,
    parseSql,
    printSql,
} from 'happy-sql';
```

### `convertSqlToJs(sql)`

```js
convertSqlToJs('SELECT COUNT(*)\nFROM users\n');
// [
//     select(count('*'), from(users)),
// ];
```

### `convertJsToSql(js)`

```js
convertJsToSql('select(count(\'*\'), from(users))');
// "SELECT COUNT(*)\nFROM users\n"
```

### `parseSql(sql)`

Returns a Babel-compatible AST node. Use when you need to inspect or transform the tree directly.

### `printSql(ast)`

Prints a Babel AST node back to a SQL string.

## Used by

- [`@putout/processor-sql`](https://github.com/coderaiser/putout/tree/master/packages/processor-sql) — lets 🐊[Putout](https://github.com/coderaiser/putout) lint and transform `.sql` files
- [`@putout/plugin-sql`](https://github.com/coderaiser/putout/tree/master/packages/plugin-sql) — SQL-specific rules for Putout (`apply-count`, `postgres`, SQLite↔Postgres conversions)
- [`putnik`](https://github.com/coderaiser/putnik) — code transformation engine that writes AST into SQLite and runs SQL-aware plugins against it

## License

MIT
