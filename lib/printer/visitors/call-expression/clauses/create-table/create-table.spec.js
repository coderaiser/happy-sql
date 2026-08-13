import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: createTable', (t) => {
    t.noTransform('createTable');
    t.end();
});

test('happy-sql: printer: clause: createTableSerial', (t) => {
    t.noTransform('createTableSerial');
    t.end();
});
