import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: where-fix', (t) => {
    t.transform('where');
    t.end();
});
