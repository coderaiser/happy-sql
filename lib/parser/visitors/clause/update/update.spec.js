import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: update', (t) => {
    t.transform('update');
    t.end();
});

test('happy-sql: parser: clause: update-no-where', (t) => {
    t.transform('update-no-where');
    t.end();
});

test('happy-sql: parser: clause: update-string', (t) => {
    t.transform('update-string');
    t.end();
});
