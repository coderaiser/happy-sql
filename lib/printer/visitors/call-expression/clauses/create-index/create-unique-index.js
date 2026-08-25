import {printIndexBody} from './create-index.js';

export const createUniqueIndex = (path, printer) => {
    printer.write('CREATE UNIQUE INDEX ');
    printIndexBody(path, printer);
};
