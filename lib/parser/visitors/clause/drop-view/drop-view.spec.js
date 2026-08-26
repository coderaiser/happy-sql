import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: drop-view', (t) => {
    t.transform('drop-view');
    t.end();
});

test('happy-sql: parser: clause: drop-view-multi', (t) => {
    t.transform('drop-view-multi');
    t.end();
});

test('happy-sql: parser: clause: drop-view-if-exists', (t) => {
    t.transform('drop-view-if-exists');
    t.end();
});
