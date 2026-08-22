import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: right-join', (t) => {
    t.transform('right-join');
    t.end();
});
