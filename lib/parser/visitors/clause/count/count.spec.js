import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: count', (t) => {
    t.transform('count');
    t.end();
});

test('happy-sql: parser: clause: count-one', (t) => {
    t.transform('count-one');
    t.end();
});
