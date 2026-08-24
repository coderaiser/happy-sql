import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: intersect', (t) => {
    t.transform('intersect');
    t.end();
});
