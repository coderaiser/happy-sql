import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: or-replace', (t) => {
    t.transform('or-replace');
    t.end();
});
