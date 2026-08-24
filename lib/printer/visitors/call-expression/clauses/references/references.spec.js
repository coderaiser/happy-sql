import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: references', (t) => {
    t.transform('references');
    t.end();
});
