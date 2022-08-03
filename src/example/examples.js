import example1 from './example1.json';
import example2 from './example2.json';
import example3 from './example3.json';
import example4 from './example4.json';

export const buildExample1 = () => {
    return JSON.parse(JSON.stringify(example1.board));
}
export const buildExample2 = () => {
    return JSON.parse(JSON.stringify(example2.board));
}
export const buildExample3 = () => {
    return JSON.parse(JSON.stringify(example3.board));
}
export const buildExample4 = () => {
    return JSON.parse(JSON.stringify(example4.board));
}