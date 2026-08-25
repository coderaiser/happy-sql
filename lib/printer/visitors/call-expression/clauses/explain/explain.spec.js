import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: explain', (t) => {
    t.transform('explain');
    t.end();
});
