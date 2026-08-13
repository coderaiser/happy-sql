import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: returning-fix', (t) => {
    t.noTransform('returning-fix');
    t.end();
});

test('happy-sql: printer: clause: returning-id-fix', (t) => {
    t.noTransform('returning-id-fix');
    t.end();
});

test('happy-sql: printer: clause: returning-conflict-fix', (t) => {
    t.noTransform('returning-conflict-fix');
    t.end();
});

test('happy-sql: printer: clause: returning-multi-fix', (t) => {
    t.noTransform('returning-multi-fix');
    t.end();
});
