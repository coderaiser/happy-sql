import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: truncate', (t) => {
    t.transform('truncate');
    t.end();
});

test('happy-sql: printer: clause: truncate-multi', (t) => {
    t.transform('truncate-multi');
    t.end();
});
