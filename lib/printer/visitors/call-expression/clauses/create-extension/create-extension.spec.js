import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: create-extension', (t) => {
    t.transform('create-extension');
    t.end();
});
