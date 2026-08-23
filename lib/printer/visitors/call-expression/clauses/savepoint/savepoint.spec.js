import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: savepoint', (t) => {
    t.transform('savepoint');
    t.end();
});
