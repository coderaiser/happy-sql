import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: lateral-join', (t) => {
    t.transform('lateral-join');
    t.end();
});

test('happy-sql: printer: clause: lateral-no-as', (t) => {
    t.transform('lateral-no-as');
    t.end();
});
