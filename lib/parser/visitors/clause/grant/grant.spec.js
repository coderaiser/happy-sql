import {createTest} from '#parser/test';

const {test} = createTest(import.meta.url);

test('happy-sql: parser: clause: grant', (t) => {
    t.transform('grant');
    t.end();
});

test('happy-sql: parser: clause: grant-multi', (t) => {
    t.transform('grant-multi');
    t.end();
});
