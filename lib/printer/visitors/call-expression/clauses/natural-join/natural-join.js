import {printTable} from '../join/join.js';

export const naturalJoin = (path, printer) => {
    const {write} = printer;
    
    write.breakline();
    write('NATURAL JOIN ');
    printTable(path.get('arguments')[0], printer);
};
