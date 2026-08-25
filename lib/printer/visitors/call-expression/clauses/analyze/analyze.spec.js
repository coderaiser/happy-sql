import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: analyze', (t) => {
    t.transform('analyze');
    t.end();
});

test('happy-sql: printer: clause: analyze with table', (t) => {
    t.transform('analyze-table');
    t.end();
});
