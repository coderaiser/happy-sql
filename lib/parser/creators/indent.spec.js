import {test} from 'supertape';
import {indent} from '#indent';

test('happy-sql: parser: creators: indent', (t) => {
    const result = indent('hello');
    const expected = '\n        hello\n    ';
    
    t.equal(result, expected);
    t.end();
});
