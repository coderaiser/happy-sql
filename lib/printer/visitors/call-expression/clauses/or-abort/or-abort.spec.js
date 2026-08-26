import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: or-abort', (t) => {
    t.transform('or-abort');
    t.end();
});
