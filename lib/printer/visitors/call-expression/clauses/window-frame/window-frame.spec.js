import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: window-frame', (t) => {
    t.transform('window-frame');
    t.end();
});

test('happy-sql: printer: clause: window-frame: window-frame-unbounded', (t) => {
    t.transform('window-frame-unbounded');
    t.end();
});
