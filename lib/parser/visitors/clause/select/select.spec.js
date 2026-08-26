import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: select', (t) => {
    t.transform('select');
    t.end();
});

test('happy-sql: parser: clause: select-alias', (t) => {
    t.transform('select-alias');
    t.end();
});

test('happy-sql: parser: clause: select-number', (t) => {
    t.transform('select-number');
    t.end();
});

test('happy-sql: parser: clause: select-alias-param', (t) => {
    t.transform('select-alias-param');
    t.end();
});

test('happy-sql: parser: clause: select-last-insert-rowid', (t) => {
    t.transform('select-last-insert-rowid');
    t.end();
});

test('happy-sql: parser: clause: select-lastval', (t) => {
    t.transform('select-lastval');
    t.end();
});

test('happy-sql: parser: clause: select-param', (t) => {
    t.transform('select-param');
    t.end();
});

test('happy-sql: parser: clause: select: select-sum', (t) => {
    t.transform('select-sum');
    t.end();
});

test('happy-sql: parser: clause: select: select-avg', (t) => {
    t.transform('select-avg');
    t.end();
});

test('happy-sql: parser: clause: select: select-min-max', (t) => {
    t.transform('select-min-max');
    t.end();
});

test('happy-sql: parser: clause: select: select-count-col', (t) => {
    t.transform('select-count-col');
    t.end();
});

test('happy-sql: parser: clause: select: select-distinct', (t) => {
    t.transform('select-distinct');
    t.end();
});

test('happy-sql: parser: clause: select: select-distinct-multi', (t) => {
    t.transform('select-distinct-multi');
    t.end();
});

test('happy-sql: parser: clause: select: select-abs', (t) => {
    t.transform('select-abs');
    t.end();
});

test('happy-sql: parser: clause: select: select-coalesce', (t) => {
    t.transform('select-coalesce');
    t.end();
});

test('happy-sql: parser: clause: select: select-coalesce-str', (t) => {
    t.transform('select-coalesce-str');
    t.end();
});

test('happy-sql: parser: clause: select: select-cast', (t) => {
    t.transform('select-cast');
    t.end();
});

test('happy-sql: parser: clause: select: select-cast-int', (t) => {
    t.transform('select-cast-int');
    t.end();
});

test('happy-sql: parser: clause: select: select-cast-operator', (t) => {
    t.transform('select-cast-operator');
    t.end();
});

test('happy-sql: parser: clause: select: select-case-when', (t) => {
    t.transform('select-case-when');
    t.end();
});

test('happy-sql: parser: clause: select: select-case-when-alias', (t) => {
    t.transform('select-case-when-alias');
    t.end();
});

test('happy-sql: parser: clause: select: select-null', (t) => {
    t.transform('select-null');
    t.end();
});

test('happy-sql: parser: clause: select: select-bool', (t) => {
    t.transform('select-bool');
    t.end();
});

test('happy-sql: parser: clause: select: select-table-star', (t) => {
    t.transform('select-table-star');
    t.end();
});

test('happy-sql: parser: clause: select: select-extract', (t) => {
    t.transform('select-extract');
    t.end();
});

test('happy-sql: parser: clause: select: select-json-arrow', (t) => {
    t.transform('select-json-arrow');
    t.end();
});

test('happy-sql: parser: clause: select: select-json-double-arrow', (t) => {
    t.transform('select-json-double-arrow');
    t.end();
});

test('happy-sql: parser: clause: select: select-concat', (t) => {
    t.transform('select-concat');
    t.end();
});

test('happy-sql: parser: clause: select: select-concat-multi', (t) => {
    t.transform('select-concat-multi');
    t.end();
});

test('happy-sql: parser: clause: select: select-filter', (t) => {
    t.transform('select-filter');
    t.end();
});

test('happy-sql: parser: clause: select: select-distinct-on', (t) => {
    t.transform('select-distinct-on');
    t.end();
});

test('happy-sql: parser: clause: select: select-window-named', (t) => {
    t.transform('select-window-named');
    t.end();
});

test('happy-sql: parser: clause: select: select-values', (t) => {
    t.transform('select-values');
    t.end();
});

test('happy-sql: parser: clause: select: select-over', (t) => {
    t.transform('select-over');
    t.end();
});

test('happy-sql: parser: clause: select: select-over-order-by', (t) => {
    t.transform('select-over-order-by');
    t.end();
});

test('happy-sql: parser: clause: select: select-over-partition-by', (t) => {
    t.transform('select-over-partition-by');
    t.end();
});

test('happy-sql: parser: clause: select: select-over-partition-multi', (t) => {
    t.transform('select-over-partition-multi');
    t.end();
});

test('happy-sql: parser: clause: select: select-array', (t) => {
    t.transform('select-array');
    t.end();
});

test('happy-sql: parser: clause: select: select-window-named-partition', (t) => {
    t.transform('select-window-named-partition');
    t.end();
});

test('happy-sql: parser: clause: select: select-distinct-on-multi', (t) => {
    t.transform('select-distinct-on-multi');
    t.end();
});

test('happy-sql: parser: clause: select: select-arithmetic', (t) => {
    t.transform('select-arithmetic');
    t.end();
});

test('happy-sql: parser: clause: select: select-unary', (t) => {
    t.transform('select-unary');
    t.end();
});

test('happy-sql: parser: clause: select: select-not', (t) => {
    t.transform('select-not');
    t.end();
});

test('happy-sql: parser: clause: select: select-between', (t) => {
    t.transform('select-between');
    t.end();
});

test('happy-sql: parser: clause: select: select-isnull', (t) => {
    t.transform('select-isnull');
    t.end();
});

test('happy-sql: parser: clause: select: select-exists-column', (t) => {
    t.transform('select-exists-column');
    t.end();
});

test('happy-sql: parser: clause: select: select-scalar-subquery', (t) => {
    t.transform('select-scalar-subquery');
    t.end();
});

test('happy-sql: parser: clause: select: select-array-cast', (t) => {
    t.transform('select-array-cast');
    t.end();
});

test('happy-sql: parser: clause: select: select-subscript', (t) => {
    t.transform('select-subscript');
    t.end();
});

test('happy-sql: parser: clause: select: select-qualified', (t) => {
    t.transform('select-qualified');
    t.end();
});

test('happy-sql: parser: clause: select: select-quoted-identifier', (t) => {
    t.transform('select-quoted-identifier');
    t.end();
});

test('happy-sql: parser: clause: select: select-over-frame', (t) => {
    t.transform('select-over-frame');
    t.end();
});

test('happy-sql: parser: clause: select: select-limit-all', (t) => {
    t.transform('select-limit-all');
    t.end();
});

test('happy-sql: parser: clause: select: select-offset', (t) => {
    t.transform('select-offset');
    t.end();
});

test('happy-sql: parser: clause: select: select-fetch-first', (t) => {
    t.transform('select-fetch-first');
    t.end();
});

test('happy-sql: parser: clause: select: select-for-update', (t) => {
    t.transform('select-for-update');
    t.end();
});

test('happy-sql: parser: clause: select: select-nextval', (t) => {
    t.transform('select-nextval');
    t.end();
});
