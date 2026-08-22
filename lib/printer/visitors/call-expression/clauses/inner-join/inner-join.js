import {printJoinBody} from '../join/join.js';

export const innerJoin = (path, printer) => {
    const {write} = printer;
    write.breakline();
    write('INNER JOIN ');
    printJoinBody(path, printer);
};
