import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: createSequence', (t) => {
    t.transform('createSequence');
    t.end();
});
