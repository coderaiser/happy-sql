import {printTable} from '../join/join.js';

export const crossJoin = (path, printer) => {
    const {write} = printer;
    
    write.breakline();
    write('CROSS JOIN ');
    printTable(path.get('arguments')[0], printer);
};
