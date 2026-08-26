import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: collate', (t) => {
    t.transform('collate');
    t.end();
});
