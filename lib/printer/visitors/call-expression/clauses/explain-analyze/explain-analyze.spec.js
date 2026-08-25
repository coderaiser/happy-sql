import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: explain-analyze', (t) => {
    t.transform('explain-analyze');
    t.end();
});
