import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: over', (t) => {
    t.transform('over');
    t.end();
});
