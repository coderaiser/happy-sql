import {printTableBody} from '../create-table/create-table.js';

export const createTempTable = (path, printer) => {
    printer.write('CREATE TEMP TABLE ');
    printTableBody(path, printer);
};

export const createTempTableIfNotExists = (path, printer) => {
    printer.write('CREATE TEMP TABLE IF NOT EXISTS ');
    printTableBody(path, printer);
};
