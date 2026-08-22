import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: left-join', (t) => {
    t.transform('left-join');
    t.end();
});
