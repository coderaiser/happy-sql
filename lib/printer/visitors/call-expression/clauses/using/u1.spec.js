import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('u1', (t) => {
    t.transform('u1');
    t.end();
});
