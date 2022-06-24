console.log('utils is running');

const square = (x) => x * x;

const add = (a, b) => a + b;

// can also export things directly where you create the function
export const minus = (a, b) => a - b;

// named export (because you have to export/import those things with the exact names)
// to import specific things e.g. functions from another file, you have to export those things
export { square, add };
