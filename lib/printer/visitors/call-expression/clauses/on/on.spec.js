import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: on: json-tuple', (t) => {
    t.transform('on-json-tuple');
    t.end();
});
