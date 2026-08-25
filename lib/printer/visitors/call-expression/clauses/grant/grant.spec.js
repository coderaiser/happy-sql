import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: grant', (t) => {
    t.transform('grant');
    t.end();
});
