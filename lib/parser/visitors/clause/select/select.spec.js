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
