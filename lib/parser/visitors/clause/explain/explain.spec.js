import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: explain', (t) => {
    t.transform('explain');
    t.end();
});

test('happy-sql: parser: clause: explain-analyze', (t) => {
    t.transform('explain-analyze');
    t.end();
});
