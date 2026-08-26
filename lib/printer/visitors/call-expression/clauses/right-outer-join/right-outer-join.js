import {printJoinBody} from '../join/join.js';

export const rightOuterJoin = (path, printer) => {
    const {write} = printer;
    write.breakline();
    write('RIGHT OUTER JOIN ');
    printJoinBody(path, printer);
};
