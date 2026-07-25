import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: where', (t) => {
    t.transform('where');
    t.end();
});

test('happy-sql: parser: clause: where-number', (t) => {
    t.transform('where-number');
    t.end();
});

test('happy-sql: parser: clause: where-or', (t) => {
    t.transform('where-or');
    t.end();
});
