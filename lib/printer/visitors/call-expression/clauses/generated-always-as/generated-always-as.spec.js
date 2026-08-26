import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: generated-always-as', (t) => {
    t.transform('generated-always-as');
    t.end();
});
