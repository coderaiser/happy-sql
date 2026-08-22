import {printJoinBody} from '../join/join.js';

export const leftJoin = (path, printer) => {
    const {write} = printer;
    write.breakline();
    write('LEFT JOIN ');
    printJoinBody(path, printer);
};
