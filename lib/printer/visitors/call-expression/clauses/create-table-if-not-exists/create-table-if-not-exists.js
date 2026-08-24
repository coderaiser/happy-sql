import {printTableBody} from '../create-table/create-table.js';

export const createTableIfNotExists = (path, printer) => {
    printer.write('CREATE TABLE IF NOT EXISTS ');
    printTableBody(path, printer);
};
