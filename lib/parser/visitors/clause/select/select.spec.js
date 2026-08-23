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
