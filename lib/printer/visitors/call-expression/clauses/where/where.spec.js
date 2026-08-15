import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: where', (t) => {
    t.transform('where');
    t.end();
});
