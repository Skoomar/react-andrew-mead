# Notes for Andrew Mead's Complete React Developer Course (w/ Hooks and Redux)
https://www.udemy.com/course/react-2nd-edition

##Section 3 - Hello React

###Set-up stuff
- install node and yarn using whatever
- using `-g` on `npm install` will install it globally (i.e. not just to this project)
 

- `npm install -g live-server`
  - for the live reload functionality, seeing changes to your webpage soon as you make them in the code
  - then `live-server public` to run it (must be run from wherever *public* directory is)


- `npm install -g babel-cli`
  - for the compilation of ES6/7 to ES5 
  - syntactic sugariser basically
  - so you can use JSX in a nice way


- `yarn init` or `npm init` to create the *package.json* and allow you to install the local dependencies your project needs (e.g. the babel-cli you installed above)
- `yarn add babel-preset-react@6.24.1 babel-preset-env@1.5.2` to install all these dependencies locally
  - installs those dependencies locally instead of globally
  - so they're just for this project
  - you can see your local dependencies package.json
  - they are all stored in *node_modules*
  - can also look in yarn.lock file to see specific details of all your local dependencies e.g. where they were downloaded from
    - good for when you're debugging an issue e.g. seeing if you have wrong library version etc


- `yarn install` installs all the local dependencies defined in your package.json


- `babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch`
  - why we have an app.js in the public/scripts folder AND in src?
    - the one in *src* will contain our JSX and all our actual coding etc
    - the one in *public/scripts* will be an auto-generated file created by Babel when it reads the *src/app.js*
      - this is what the index.html actually uses
    - The command above creates the scripts/app.js from the output of babel reading src/app.js
  - `--watch` flag sets babel to monitor any changes made to src/app.js and update the scripts/app.js as soon as changes are made
    - so you don't have to keep running this command every time you make a change (as long that --watch command is running)

##Section 5 - Stateless Functional Components

###React Dev Tools
- React DevTools plugin available for Chrome and Firefox
- when running in development (not prod), open the console and to the right should be two tabs
  - `Components` and `Profiler`
- can use to see info about the components you have
  - e.g. their props & state
  - Can edit these values to see the change immediately
- Can search the name of your component to see them in isolation and focus on debugging them
- You'll see the `$r` sign on components you're clicked on
  - whatever component you currently have selected can be accessed from the console by typing $r
    - then you can see all the stuff to do with that component

###localStorage
- Can use localStorage in the console on a React webpage
  - also useful to use it in lifecycle methods to save/load data locally
- can be used as a simple database mechanism for testing
- in the console can do
  - `localStorage.setItem('item')`
  - `localStorage.getItem('item')`
  - `localStorage.removeItem('item')`
- This data persists through page loads
  - so even if you refresh, the data will still be there
- Note: this only works with strings, can't directly put numbers or arrays
  - to work with nums and arrays, use JSON
  - use `const json = JSON.stringify()` to convert your data to JSON
  - then `JSON.parse(json)` to get the JSON object

##Section 6 - Webpack


###Global Modules
- You should generally avoid using global modules
  - yes you can install your modules globally to your PC but then the local dependencies (for your project) aren't there for anyone else to see
  - they won't be in the package.json file for other people to use to get the right dependencies to run your app
  - if you use local dependencies instead, you have freedom of using different versions for different apps
- you can remove the global dependencies used so far in the course with:
  - `npm uninstall -g babel-cli live-server`
  - or if you used yarn to install stuff, use this `yarn global remove` to remove every global dependency
- install babel-cli and live-server locally with `npm install babel-cli live-server`
- Local dependencies will be in your package.json
- You won't be able to run these dependencies from the terminal (like you were with live-server etc)
- Instead we have to set up our `scripts` inside package.json
  - put the commands you want to run inside `scripts` using key-value pairs
  - then run the desired script using `npm run <script-name>`
    - (or `yarn run <script-name` if you're using yarn)
- To set up Babel to run with Webpack:
  - `npm install babel-core babel-loader`
    - babel-cli which we've been using so far is just for CLI (as you can imagine)
    - babel-core is for use with things like webpack
    - babel-loader allows you to tell Webpack how to run Babel when it sees certain files
  - modify webpack.config.js using `module.rules`
    - add a rule to specify babel-loader as the loader
    - add a rule for 'test' to specify which file types you actually want to run the loader on
      - we only want it to run on JS files, nothing else
      - use a regular expression to set it to only run on .js files
    - use exclude rule to stop Babel from running on undesired things
      - e.g. exclude node_modules directory
  - need to also add a config file for Babel: .babelrc
    - you'll notice the babel CLI command we've been using so far has a lot of stuff in it
    - if we want that same configuration when running from babel-core/loader, we need to set it up in babelrc

###Imports & Exports
- there are two types of exports: named exports & default exports

- Named exports must be specifically named when you import them
  - must use their exact name when you import them
  - and must be imported inside curly brackets: e.g. `import { <export-name> } from 'utils.js'`
  - to set something to be a named export you can either:
    - at the bottom of the file, put `export { thingy }`
    - or wherever you define the function/class/etc do `export const thingy = () =>...`


- Default export is the thing that is imported by default if you import from a file
  - can only have one default export from a file
  - you also import a default export slightly differently to a named export
  - has to be imported outside of the curly braces
    - e.g. `import subtract from 'utils.js'`
    - or `import subtract, { <named-export> } from 'utils.js'`
    - you can also just name default exports whatever you want when you import them, don't have to use the exact same name
      - e.g. `import blah from 'utils.js'` will import `subtract` (as long as you've set subtract as the default export)
      - kind of like Python's `import as` (but slightly different)
    - note: if you have subtract as the default export, import { subtract } from 'utils.js' will get ReferenceError because subtract is not a named export. It is just the default export
  - to export something as default export you can either:
    - at bottom of the file: `export { thingy as default, ... }`
    - AFTER you define the function/class/etc `export default thingy;`
      - or just export the function directly without defining it first: `export default () => ...;`


###Webpack
- "A module bundler for modern JS apps"
- Uses of Webpack
  - Helps to organise our JS
    - When we run Webpack, it returns a single JS file back - called the `bundle`
    - This bundle contains everything our app needs to run
      - the dependencies
      - and the application code
    - So we only need to put one `<script>` tag in the HTML to the bundle
      - instead of having to put a <script> for every JS file
      - Having to make all those requests to multiple files can slow your app a lot, so good to have it all in one
  - Webpack will also run Babel for us, we don't have to keep running that command we've been using so far

###Configuring Webpack
- install Webpack with `npm install webpack@3.1.0` (version used for this course)
- in your package.json scripts, put one `"build": "webpack"`
  - this will run webpack which will run the bundle and deal with babel without us having to worry about it
  - can also add --watch to keep it running UNLESS you're using webpack-dev-server which will do that for you anyway
- you also need to create a `webpack.config.js` file in the project's root folder
  - in this file we need to tell webpack two things
    - the entry point for our application: this is the app.js file which webpack will build the bundle from
    - the output file: where we want webpack to output the bundle file
- then use `node webpack.config.js` to configure Webpack with the properties you specified
- now webpack is set up to run using your `npm/yarn run build` (or whatever you named the script)
  - this command will always output a hash which you can use to verify the integrity of your build
  - and the webpack version
  - and the time taken to do everything
  - the bundle.js file and its size
  - the app.js file and size

###Webpack Source Maps
- helps a lot for debugging React apps
- it's not easy to read the stacktraces in the console with React apps
  - because the app runs from the bundle.js which is massive and contains everything to do with running the app
    - can be like tens of thousands of lines long
  - so the stacktrace just shows that file
- Source Maps help by telling you the exact line(s) in the file(s) where an error occurred
- can be set up by adding a `devtool` property in webpack.js.org
  - look at https://webpack.js.org/configuration/devtool/#root to see the different types of source maps you can put in devtool
  - we're going to use `cheap-module-eval-source-map` for now
- Note: every time you change your webpack config, you need to restart the build

###Webpack Dev Server
- similar to live-server
- has some nice features
- need to set it up in webpack.config.json
  - add a `devServer` property and set the attributes you want
  - need to give the path to the public/ folder in `contentBase`
  - then in package.json, add `"dev-server": "webpack-dev-server"`
- note that using webpack-dev-server, no bundle.js file is actually saved to your project
  - dev-server will have a bundle.js loaded in memory but not actually save anything because that's slow, so keeps it quick
  - so you can delete the bundle.js file currently in public/ as it isn't being used anymore
  - BUT if you start putting stuff into production then that requires a bundle.js file to be present somewhere
    - you can create that using `npm run build` if you need it

###Babel Transform Class Properties
- https://babeljs.io/docs/en/babel-plugin-proposal-class-properties 
- can use this to simplify writing classes
- You can write classes in the simple ES6 format and then Babel with this plugin will convert it to ES5 at runtime
  - don't have to write out this.<attr-name> and do all that constructor stuff
  - don't have to .bind(this) all the methods
  - the plugin does it all for you
  - note: methods must be written in arrow format for it to work (i think)
  - note: lifecycle methods and the render methods should not be changed to arrow format
- install using the instructions
  - `npm install babel-plugin-transform-class-properties` (the official docs also have --save-dev)
  - then add the plugin in babel.rc

##Section 7 - Using Third Party Components

###Built-In Children  Props
- You can pass JSX into a React Component by doing `<MyComponent><p>some JSX</p></MyComponent>`
  - like nested HTML
- This JSX will then be available inside that component's props
  - using `props.children`