import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: left-outer-join', (t) => {
    t.transform('left-outer-join');
    t.end();
});
