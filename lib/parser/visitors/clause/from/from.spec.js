import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: from', (t) => {
    t.transform('from');
    t.end();
});

test('happy-sql: parser: clause: from: join', (t) => {
    t.transform('join');
    t.end();
});

test('happy-sql: parser: clause: from: join-multi', (t) => {
    t.transform('join-multi');
    t.end();
});
