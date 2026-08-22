import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: union-all', (t) => {
    t.transform('union-all');
    t.end();
});
