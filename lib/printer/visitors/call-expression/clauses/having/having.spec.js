import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: having', (t) => {
    t.transform('having');
    t.end();
});
