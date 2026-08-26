import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: rightOuterJoin', (t) => {
    t.transform('rightOuterJoin');
    t.end();
});
