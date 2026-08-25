import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: detach', (t) => {
    t.transform('detach');
    t.end();
});
