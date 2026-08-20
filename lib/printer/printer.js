import {print} from '@putout/printer';
import {visitors} from './visitors/index.js';

export const printSql = (ast) => {
    return print(ast, {
        visitors,
    }).trimEnd();
};
