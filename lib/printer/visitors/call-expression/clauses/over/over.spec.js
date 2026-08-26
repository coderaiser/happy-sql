import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: over', (t) => {
    t.transform('over');
    t.end();
});

test('happy-sql: printer: clause: over: over-frame', (t) => {
    t.transform('over-frame');
    t.end();
});
