import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: count', (t) => {
    t.noTransform('count');
    t.end();
});

test('happy-sql: printer: clause: count-one', (t) => {
    t.noTransform('count-one');
    t.end();
});
