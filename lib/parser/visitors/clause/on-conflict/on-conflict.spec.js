import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: on-conflict', (t) => {
    t.transform('on-conflict');
    t.end();
});

test('happy-sql: parser: clause: on-conflict-nothing', (t) => {
    t.transform('on-conflict-nothing');
    t.end();
});
