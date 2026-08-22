import {printJoinBody} from '../join/join.js';

export const rightJoin = (path, printer) => {
    const {write} = printer;
    write.breakline();
    write('RIGHT JOIN ');
    printJoinBody(path, printer);
};
