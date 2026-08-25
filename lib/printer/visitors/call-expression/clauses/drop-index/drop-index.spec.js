import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: drop-index', (t) => {
    t.transform('drop-index');
    t.end();
});

test('happy-sql: printer: clause: drop-index-multi', (t) => {
    t.transform('drop-index-multi');
    t.end();
});

test('happy-sql: printer: clause: drop-index-if-exists', (t) => {
    t.transform('drop-index-if-exists');
    t.end();
});
