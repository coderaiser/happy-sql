import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: not-exists', (t) => {
    t.transform('not-exists');
    t.end();
});
