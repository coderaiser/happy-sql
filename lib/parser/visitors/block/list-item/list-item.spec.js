import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: list-item', (t) => {
    t.transform('list-item');
    t.end();
});

test('happy-sql: parser: list-item-nested', (t) => {
    t.transform('list-item-nested');
    t.end();
});
