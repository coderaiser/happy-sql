import {printJoinBody} from '../join/join.js';

export const fullOuterJoin = (path, printer) => {
    const {write} = printer;
    
    write.breakline();
    write('FULL OUTER JOIN ');
    printJoinBody(path, printer);
};