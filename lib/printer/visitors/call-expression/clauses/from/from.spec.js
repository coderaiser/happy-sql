import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: from', (t) => {
    t.noTransform('from');
    t.end();
});

