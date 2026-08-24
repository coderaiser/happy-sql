import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: replaceInto', (t) => {
    t.transform('replace-into');
    t.end();
});
