import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: natural-join', (t) => {
    t.transform('natural-join');
    t.end();
});
