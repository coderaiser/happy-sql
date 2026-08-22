import {printJoinBody} from '../join/join.js';

export const leftOuterJoin = (path, printer) => {
    const {write} = printer;
    write.breakline();
    write('LEFT OUTER JOIN ');
    printJoinBody(path, printer);
};
