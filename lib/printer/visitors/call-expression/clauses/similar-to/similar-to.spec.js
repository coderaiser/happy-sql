import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: similar-to', (t) => {
    t.transform('similar-to');
    t.end();
});
