import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: release-savepoint', (t) => {
    t.transform('release-savepoint');
    t.end();
});
