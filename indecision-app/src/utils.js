// there are two types of exports: named exports & default exports
// named exports must be specifically named when you import them in the format import { <export-name> from 'utils.js'}
// default export is the thing that is imported by default if you just put import 'utils.js'
    // can only have one default export from a file
    // also note that you can't import a default export like a named export
        // e.g. if you have subtract as the default export, import { subtract } from 'utils.js' you get ReferenceError because subtract is not a named export
    // has to be imported outside of the curly braces
        // e.g. `import subtract from 'utils.js'`
        // or `import subtract, { <named-export> } from 'utils.js'`

console.log('utils is running');

const square = (x) => x * x;

const add = (a, b) => a + b;

// can also export things directly where you create the function
export const multiply = (a, b) => a * b;

const subtract = (a, b) => a - b;

// square and add are named exports here
// subtract is the default export.
// If we try to default multiple things as default then an error will be thrown because there can only be one default
export { square, add, subtract as default};
