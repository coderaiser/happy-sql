import {createTest} from '#printer/test';

const {test} = createTest(import.meta.url);

test('happy-sql: printer: clause: createTable', (t) => {
    t.transform('createTable');
    t.end();
});

test('happy-sql: printer: clause: createTableSerial', (t) => {
    t.transform('createTableSerial');
    t.end();
});

test('happy-sql: printer: clause: createTableIdentity', (t) => {
    t.transform('createTableIdentity');
    t.end();
});

test('happy-sql: printer: clause: createTableIdentityByDefault', (t) => {
    t.transform('createTableIdentityByDefault');
    t.end();
});

test('happy-sql: printer: clause: createTable: createTableTablePrimaryKey', (t) => {
    t.transform('createTableTablePrimaryKey');
    t.end();
});

test('happy-sql: printer: clause: createTable: createTableTableUnique', (t) => {
    t.transform('createTableTableUnique');
    t.end();
});

test('happy-sql: printer: clause: createTable: createTableNamedConstraint', (t) => {
    t.transform('createTableNamedConstraint');
    t.end();
});

test('happy-sql: printer: clause: createTable: createTableGenerated', (t) => {
    t.transform('createTableGenerated');
    t.end();
});

test('happy-sql: printer: clause: createTable: createTableReferencesActions', (t) => {
    t.transform('createTableReferencesActions');
    t.end();
});
