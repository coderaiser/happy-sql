import {test} from 'supertape';
import {dedent} from '#dedent';

test('happy-sql: parser: creators: dedent', (t) => {
    const result = dedent('\n        hello\n    ');
    const expected = 'hello';
    
    t.equal(result, expected);
    t.end();
});
