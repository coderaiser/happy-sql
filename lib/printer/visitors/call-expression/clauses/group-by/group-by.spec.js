import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: groupBy', (t) => {
    t.transform('group-by');
    t.end();
});

test('happy-sql: printer: clause: groupBy: multi', (t) => {
    t.transform('group-by-multi');
    t.end();
});
