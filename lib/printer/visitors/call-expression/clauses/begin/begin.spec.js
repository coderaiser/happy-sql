import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: begin', (t) => {
    t.transform('begin');
    t.end();
});
