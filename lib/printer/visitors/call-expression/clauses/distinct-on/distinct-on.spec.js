import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: distinct-on', (t) => {
    t.transform('distinct-on');
    t.end();
});

test('happy-sql: printer: clause: select-distinct-on-multi', (t) => {
    t.transform('select-distinct-on-multi');
    t.end();
});
