import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: constraint', (t) => {
    t.transform('constraint');
    t.end();
});
