import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: case-when', (t) => {
    t.transform('case-when');
    t.end();
});
