import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: select', (t) => {
    t.transform('select');
    t.end();
});

test('happy-sql: printer: clause: string', (t) => {
    t.transform('string');
    t.end();
});
