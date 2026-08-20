import test from 'supertape';
import {tryCatch} from 'try-catch';
import {convertClause} from '#parser/clause';

test('happy-sql: parser: clause: unsupported statement throws', (t) => {
    const [error] = tryCatch(convertClause, {
        type: 'unknown_stmt',
        clauses: [],
    });
    
    t.match(error.message, 'unknown_stmt not supported yet');
    t.end();
});
