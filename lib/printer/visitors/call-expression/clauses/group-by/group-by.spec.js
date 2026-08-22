import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: group-by', (t) => {
    t.transform('group-by');
    t.end();
});

test('happy-sql: printer: clause: groupBy: group-by-multi', (t) => {
    t.transform('group-by-multi');
    t.end();
});
