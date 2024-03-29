# Notes for Andrew Mead's Complete React Developer Course (w/ Hooks and Redux)
https://www.udemy.com/course/react-2nd-edition

##Terminology
- **Controlled Input** - an input where the value is controlled by JS
  - e.g. if you have an input with `value={props.stuff}` and in the `onChange` you're changing the value of the props.stuff variable
  - so the value of the input is initialised with whatever the default value of props.stuff is and then changes based on stuff going in the JS
  - so the input is controlled by JS

## Libraries to note
- react-dates
- moment (for formatting time - clock time, days, months, years etc)
- numeral (for formatting numbers)

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
      - instead of having to put a `<script>` for every JS file
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

###React Modal
- https://github.com/reactjs/react-modal
- a third party component
- like a pop-up alert but looks nicer and more features

##Section 8 - Styling React
- we need to set our project so that Webpack can use CSS/SCSS
  - install css-loader https://www.npmjs.com/package/css-loader 
    - allows webpack to load in our CSS assets by converting them to JS
  - and the style-loader https://www.npmjs.com/package/style-loader
    - takes the JS that css-loader outputs and adds it to the DOM by injecting a style tag
- in webpack.config.js, in module.rules add a test for .css files and a `use` array to add the style-loader and css-loader
  - `use` is like the `loader` option we used for babel but allows you to use multiple loaders by putting them in the use array

###SCSS
- https://sass-lang.com/
- is a superset of CSS which adds additional functionality
- it's compiled down to regular CSS so browsers can understand it
  - so we need to set this up
  - need to install sass-loader and node-sass
  - add sass-loader to the css loaders in webpack.config
- with SCSS we can split our styles into different files and import them in the main styles.scss
- partial scss files must have an underscore at the start
  - e.g. _base.scss
  - these are then imported in the main style file
    - but when importing them, we don't put the underscore or the file extension
    - e.g. _base.scss would be imported like `@import './base/base`
- https://sass-lang.com/documentation/values/functions all SASS functions

####rem
- like CSS **px** but more accessible. 
- they are based off the font size of the root HTML element (16px by default)
- allows accessibility devices to scale it however is best for them
- if you're curious about how big the **rem** has been rendered on your device, look in the console and look at computed styles
- rems do make it more complicated to think about how big things might be on your screen
  - with pixels it's easier, but with rems we have to think about the conversion process
  - e.g. if you want a 22.2pt font, how many rems is that - it's complicated to calculate
  - one solution:
    - add `html { font-size: 62.5%; }`
    - base font-size is 16px by default, multiply that by .625, we get 10
    - so we will be working with rems in a base 10 system, just like pixels
    - so if we do 2.2rem that can translate easily to 22px

###CSS Reset
- different browsers have different default styles
- if we don't reset the styles then your CSS will base styles around the default of the browser
  - so the page will have different styles on different browsers
- We use a third party library to do our CSS reset (because else we'd have to write out lots of stuff)
- https://necolas.github.io/normalize.css/ 
- import it in your app.js

###Viewport
- Different devices will have different resolutions etc
- The viewport is the size of the screen being used to view the page
- you can use developer tools in Firefox/Chrome etc to see the view for different devices/browsers
- in index.html, use the `viewport` <meta> option to automatically size the page to fit the device
- in your CSS, you can use @media to set different styles for different viewport sizes


##Section 9 - React Router

###Server vs Client side routing
- Server side routing
    - browser watches for changes to the URL (caused by events such as the user clicking a button/entering a form)
    - browser makes HTTP request to server
    - server renders html and sends it back
    - this has some latency due to waiting for the requests going through the network between the server and client
- Client side routing
    - rendering is handled on the client itself using client-side JS
    - so we don't need to send requests to the server for every little change
    - We will use the HTML5 History API available in most browsers
        - this allows us to watch for URL changes and then run some JS when it does
        - without sending a request to the server
- React Router
    - is for client side routing
    - allows you to create a set of URLs from your web page
        - e.g. /, /help, /about etc
        - and set it to open different React components when those URLs are opened
    - https://reactrouterdotcom.fly.dev/docs/en/v6
    - with npm/yarn you can install `react-router` which will contain the plugin for both web-apps AND react native apps
      - or if you only want one or the other, use `react-router-dom` or `react-router-native`

###React Router set up
- in webpack config, set historyApiFallback: true
  - this tells the dev server to handle routing via the client side code
  - stops it from making calls to the server when loading/routing to a page which has been set to be loaded client side instead

###`<Link>` and `<NavLink>`
- `<Link>`
    - Use `<Link>` to create links to internal pages/components
    - instead of using `<a>` tags to go to different pages within your app, use React Router's `<Link>`
    - This avoids the full page refresh and the app sending a request to the server to get whatever page you're trying to open
    - The page for the component you're trying to open is already on the client side so <Link> will open it from there instead of routing through the server
    - for links to pages that are external to your app (not any of your React Components), obviously you can use `<a>` like usual
- `<NavLink>`
  - like `<Link>` but more customisable
  - has things to help you style the link for different states e.g. clicked/not clicked etc


###Query Strings & URL Parameters
- within a URL you might have things like:
  - `/help#contact-us` which navigates to a certain part of the page
  - `/edit/44` e.g. if you're looking at the 44th item on this page
- you can use React Router to dynamically route within your components like this


###Outdated stuff from this course
- need to put `<Route>` tags inside `<Routes>`
- don't need to use `<Switch>` to set up a 404 page, just use `path="*"`
- stuff from chapter 81 is old. Instead of using props like in this lecture, in the newer versions of React Router we use React Hooks which are later in the course. Here are the notes I had on the old way of doing things:
    - there are certain attributes that are passed in props by default (even if you haven't set anything to be passed in)
    - these are *history*, *match*, *location*, *staticContext*
        - *location*
            - contains the `hash` attribute which tells us what the hash is if we have a URL like e.g. `/help#contact-us`
        - *match*
            - contains `params` attribute which tells us the subsequent value if the URL is e.g. `/edit/99` or `/edit/thingy`
    - we can use these to help route our components dynamically
        - inside our JS we access them from props
        - e.g. `props.match.params.id` or `props.location.hash`
- can't use `history.push()` anymore
  - instead use the `useNavigate()` function


##Section 10 - Redux
- https://redux.js.org/
- Redux helps to manage state in complex webapps
  - state for the app is stored in one place instead of being passed around between components
  - this helps to create re-usable/orthogonal components as they just rely on getting data from the state, not having to depend on other components passing them everything
  - note: it's ok to pass props/state between apps and their direct children if there's a meaningful bond between them etc (e.g. Expenses passing some stuff to Expense)
  - it's just we should use Redux to avoid having data being passed down long chains of components like in indecision app
- it's for any JS Framework, not just React

- Simple state vs Complex state
  - Simple
    - e.g. indecision app we made
      - just had a few components
        - IndecisionApp was the primary one, the other components e.g. Options all had their state passed down from IndecisionApp
        - there was a direct connection to each component
        - so you can imagine it like a tree with IndecisionApp at the top and the child components branching off from that
    - The components are also all very closely bound
    - very specific methods are being passed down so each component has knowledge of other components
    - this might be ok in a simple app but in a complex one it becomes very messy
    - it stops each component from being re-usable/orthogonal as they depend very heavily on the other component passing certain things to/from them
    - instead we want components to just be able to pull from the overall state of the app
  - Complex
    - e.g. the Expensify app we're making
      - There is no parent component to all of our primary components
      - e.g. AddExpensePage and ExpenseDashboardPage are not children of a child component
      - instead they're just rendered by React Router individually
      - they have children of their own
        - AddExpensePage has the AddExpense form component
        - ExpenseDashboard has Expenses etc
      - So like two separate trees
      - how do we pass data between the two trees
    - So there's no parent component to store all the data in to pass it down from
    - and no connection between every single component
    - so where do we store the data

###Redux Set-up
- ---install it with `npm install redux`---
- Redux Toolkit is the way to do things now so instead we do `npm install @reduxjs/toolkit`
  - this has stuff to make writing the Redux easier and is the standard way of doing it now
  - old Redux stuff is deprecated
  - so some things here will be different to the course

####Redux Store
- A Redux Store is where your app's state is kept
- you usually createStore when your app starts up and then your components write to or read from that store

####Redux Actions
- actions are just an object that gets sent to the Store to change the value of something in the state
- this object describes the type of action we'd like to take
  - e.g. could have an option for incrementing, decrementing, reset value etc
- to make a call for an action to happen, use store.dispatch()

#####Subscribing and Dynamic Actions
- Subscribing
  - subscribe is used to call a function every time the Store is modified
  - can also use unsubscribe() to define at what point you want to stop a certain subscription in your app
- Dynamic actions
  - can pass in variables inside the action object which can then be used in createStore with action.<var-name>

####ES6 Destructuring
- Object destructuring
  - say you've got an object (e.g. parsed JSON from a database query or something)
  - then you want to use the variables inside that object
  - you'd usually have to do something like:
    - e.g. we have a person object. To access the name variable inside the person object we'd have to do `person.name`
  - Destructuring parses the object and allows you to use simple variable names to refer to those values
  - so e.g. instead of `person.name`, you can just write `name`
  - also can use it to destruct nested objects
- can rename variables to a different name outside the object. 
- can set default values for if there is no var of that name in the object
- Array destructuring

####Action Generators
- functions that return action objects

####Reducers
- Reducers take the current state and the action passed in
- we define the behaviour of our Redux Actions using reducers
- Reducers are pure functions
  - pure functions are functions that only use things that are directly passed into them. i.e. not using global vars
    - their output is determined purely by their input
    - and they don't change variables outside their scope (don't modify global vars or things outside their scope)
- They never change state or action
  - they do cause the state to change but they don't directly modify it themselves
  - e.g. like doing array=[1,2,3] is a new object being assigned - it isn't directly modifying the array but array.push(5) IS directly modifying the array
- You can have multiple reducers in your app by using combineReducers
  - obviously you can stick everything in one but it's messy
  - in complex apps you'll need to separate out the concerns

#####UUID
- a library to randomly generate universally unique ids
- `npm install uuid`

#####ES6 Spread Operator
- Spread op for Arrays
  - used to concatenate arrays (can use .concat but spread op looks nicer)
  - e.g. if we have this array
    - `letters = ['A', 'B', 'C']`
    - and we did `[...letters, 'D']`
    - it would concatenate letters in that array 
    - returns `['A', 'B', 'C', 'D']`
- Spread op for Objects
  - (when this course was made, spread op for objects wasn't used widely enough in mainstream JS)
    - so Andrew had to change babel config to use it
    - but we don't have to now
  - use it in similar way to arrays
    - `obj2 = {...obj1, meh: '1'}`
  - you can override attributes of the object being spread by assigning a different value to that attribute after the object has been spread
  - e.g. if obj1 has an attribute `age: 25`
    - then doing `obj2 = {yeet: 1, ...obj1, age: 30}`
    - will reassign age to 30
    - just remember that the reassignment has to occur AFTER wherever the spread object is placed in the new object
    

## Section 11 - React with Redux

- need to install `npm install react-redux`


- Redux components are reactive
  - whenever a value in the store changes, any component using that value will automatically be re-rendered with the new value


###\<Provider\>, Connect, and Dispatch
- From react-redux, we get the `Provider` component
  - this takes a Redux Store as props
  - then any components nested within it can use that store

####useDispatch and useSelector
- For **functional** components, we use `useDispatch` and `useSelector` to get state from the store and dispatch actions

####connect()()
- For **class-based** components, we use `connect`
  
- within those components, need to import `connect` function from react-redux to 'connect' the component to the store

- A Higher Order Component is a **component that renders another component**
  - usually abbreviated to **HOC**
  - good for:
    - *reusing code*
    - *render hijacking*
    - *prop manipulation*
    - *abstract state*
- We use HOCs to create 'Redux Components' when using the `connect` function

- all connected components receive the `dispatch` function in their props
  - this is the function used to call Redux Actions to make a change in the store
  - so if you want to change a Store value from within a connected component, call `dispatch()` with an action
 
 
###Working with dates in React
- in this project we use:
  - Moment.js to use datetime format in our JS code
    - https://momentjs.com/
    - `npm install moment`
    - Note: there is a default Date type in JS but it's awful and using Moment.js is basically industry standard
  - and AirBnB's open-source 'react-dates' tool to create a date picker in our UI 
    - https://airbnb.io/projects/react-dates/
    - `npm install react-dates --force` using force because npm thinks it's incompatible but this guy in the comments for this lecture said it was ok to force it
    - don't need the react-addons-shallow thing that's mentioned to make this run

###Redux Dev Tools
- There are Dev Tools for Redux which shows you what's going on with your stores, data, actions
- https://github.com/reduxjs/redux-devtools
  - *old repo*: ~~https://github.com/zalmoxisus/redux-devtools-extension~~
- To set it up:
  - install extension for your web browser
  - also need to add this line as a parameter to `createStore` so that it works with the extension:
    - `window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()`
- Now you should be able to see the Redux tab in console of your browser
  - It shows you stuff like:
    - the current state in your app
    - actions that have been dispatched 
      - in each action we can see the state after each action is dispatched, what's been added to state in that action etc


##Section 12 - Testing in React

###General testing advice
- **Fixtures** are test data
  - you store the data used in your unit tests in a directory called `fixtures` inside the `tests` directory
  - e.g. dummy objects, dummy data

###Jest
- In this course, we will use the Jest framework to test our code

####Setup Jest
- `npm i jest`
  - then in your package.json `scripts`, add `"test": "jest"` 
  - to run Jest in **watch mode**, use run `jest --watch`
    - in this case because we're running Jest through our `test` script, when we enter `npm test`, we can't just add `--watch` on the end
    - can't write `npm test --watch`
    - instead need to put an extra `--` in between to tell the CLI that the following are flags for the evaluated command, not the npm command
    - `npm test -- --watch`

####Jest Info
- *Globals*
  - There are things that Jest provides globally to your project once you install it
  - This includes methods like `test()`, `beforeEach()` etc
    - so you don't need to import Jest to use these
  - (Look in the docs under API Reference -> Globals to see the details)
- `expect()`
  - this is like `assert` in other languages
  - example usage:
    - `expect(var1).toBe(10)`
  - So you call expect() with the variable you want to run your assertion on, then call a method on it to test whatever specific assertion you're trying to make

#####Testing Reducers
- the default action when a reducer is set up is @@INIT
  - you can use this to test the default state of a filter before other actions take place


### Snapshot Testing on React Components
- How do we test what's being rendered in our React components?
- we could make loads of assertions for each different state this component may find itself in but that's really inefficient
- We use *Snapshot Testing*
  - capture how the component is rendered in it's current state e.g. in a JS object
  - then for a given event we can see what changes and compare to the snapshot 
    - if the change is what we expect then test passes
    - if it's not what we expect then test fails

- We can use a library called React Test Renderer
  - `npm i react-test-renderer`
    - might have a conflict with react-dates so just --force it
  - allows you to render the components as normal JS code and then make assertions on whatever is rendered
  - Two ways of using it:
    - *Shallow rendering*: only renders the given component
    - *Full DOM rendering*: renders the component AND child components
  - once we have the output from the react-test-renderer we can see the component as a JS object
  - Jest has a `.toMatchSnapshot()` matcher with the `expect` function which we can use for this
  - a `__snapshots__` directory will appear in the directory you run the test file.
    - it contains all the snapshots used in the tests for that directory
- but it's quite simple and limited in what it can do
  - not very easy to do things like search the rendered output for a specific element and grab its text etc

~~- Another renderer library is *Enzyme*~~
  - ~~written at AirBnB~~
  - ~~many more features than React Test Renderer~~
  - ~~set-up:~~
    - ~~`npm i enzyme`???~~
    - ~~might need to install `enzyme-adapter-react-{react version}`\~~~
    - ~~note: in this section we installed 'Request Animation Frame' - `npm i raf`\~~~
      - ~~Is something that's provided by browsers~~
      - ~~need it inside Enzyme testing environments otherwise you might get some issues~~
    - ~~also need to create a `setupTests.js` inside your `tests/` folder~~
  - So Enzyme is basically dead in React 18 - not much point following this bit
  - look into RTL (React Testing Library) instead 
    - https://www.robinwieruch.de/react-testing-library/

[//]: # TODO: Look at RTL for testing()

### Mocking
- This part of the course is still using Enzyme so ignore it and look into RTL + Jest for mocking

### Test Spies
- outdated enzyme stuff in this section as well so look into RTL

### Other tips from this otherwise outdated testing section
- Chapter 124: using mapDispatchToProps for testing using Redux

## Section 13: Deploying your apps
- using version control, deploying code to a live server etc

### Production Webpack
- need to set up webpack to build your app so it's ready for prod
  - this might use a different sourcemap than building in dev
    - different sourcemaps might be better at different things
      - e.g. quicker build vs optimised build, larger output file size vs smaller etc
- in our `webpack.config.js`, add the script `"build:prod": "webpack -p`
  - the `-p` flag to tell Webpack set the `NODE_ENV` variable to 'production'
    - this signals to the 3rd-party libraries to just load the most barebones versions possible

### Separating CSS Files
- need to set your Webpack to output your CSS files separately to your bundle.js
- otherwise it'll put all your styles in the bundle.js file that's generated when building the project
  - when your styles are in the bundle.js, they don't actually get applied in the browser until AFTER the JS runs
    - that could take some time
- to do this, you need to use a plugin for Webpack

#### extract-text-webpack-plugin
- https://www.npmjs.com/package/extract-text-webpack-plugin
- 
- ok we're using Webpack 5. This plugin is deprecated for that version of Webpack so might have to ignore Andrew here
- looks like we should use *mini-css-extract-plugin* instead
  - https://github.com/webpack-contrib/mini-css-extract-plugin
- Set-up
  - run `npm i mini-css-extract-plugin`
  - add the config for the plugin as it's been done in the webpack.config.js
  - now whenever you run `npm run build:{env}`, it'll also generate a `main.css` which contains all the styles for your project
  - final step is to add `<link rel="stylesheet" type="text/css" href="main.css">` to your index.html to get the styles working
- at this point, Andrew starts going on about how the source map might be making the debugging show you the line numbers in the massive output bundle.js/styles.css instead of in the code
  - but looks like it's not doing that in my environment (probably cos it's more up to date)
  - so maybe can ignore doing things he mentions here:
    - changing dev source-map to inline-source-map
    - changing the styles loaders to objects instead of strings in the webpack config
      - because by default sourceMaps is set to false for style loaders apparently (in his version anyway)
      - so need to put the loader name string AND set sourceMap: true in an object

### Production Web Server using Express
- http://expressjs.com/
- `npm i express`
- config for the Express server is in `server/server.js`
- to start the server up, run `node server/server.js`
  - need to have built your stuff to prod otherwise your public/ folder will be empty and it won't serve anything to the server

#### server.js set up for Express
- app.use() is for setting options for your express server
- we will use it to "register some middleware"
  - by middleware we mean: something that will run upon every request to the server
  - e.g. if someone makes a request to the server, we might want to run some code that logs something to the screen, or serves the asset that was requested
- to do that we put express.static() inside app.use()

- app.get() is used to choose what exactly to serve + alternative things to serve
- if we don't set your server up with this you'll get some issues
  - if you're on a different page on your Route path other than the home '/' then your page will disappear when you refresh
  - it won't be able to find e.g. `localhost:3000/create`
  - because there is no file or folder called e.g. `create` inside public/
  - so you need to use app.get() to make sure it's always looking for these things from INSIDE index.html

- app.listen() is used to tell what port you want the server to run on
- e.g. `app.listen('3000')`

### Deploying with Heroku
- Log in/sign up to Heroku
- install the Heroku CLI 
  - for Ubuntu: `curl https://cli-assets.heroku.com/install-ubuntu.sh | sh`
- `heroku create {app-name}`

- Heroku needs you to tell it how to run your app
  - it will look for a `start` script in your package.json
    - so set that up with the node command to start your server
  - it will also look for a `heroku-postbuild` script - this is what you use to build the assets (the HTML, JS, CSS files in public)
    - so set that to `npm run build:p`
- note: also make sure the port in app.listen() is set to dynamically take the value from process.env.PORT
  - Heroku assigns a port number to your app through that environment variable

- also apparently need this in your package.json for Heroku to work if you're using npm v7+
`    "engines": {
  "node": "^15.14.0",
  "npm": "^7.10.0"
  },`

- open your Heroku app using `heroku open` or just open the URL it gives you
- use `heroku logs` to see logs for debugging

### Prod Dependencies vs Dev Dependencies
- our prod env might not need the same dependencies as our dev env
  - e.g. our Heroku server doesn't need to use webpack-dev-server
- Can split the package.json into `devDependencies` and `dependencies`
  - devDependencies will be installed locally to be used for dev
  - and dependencies will be what's pushed to prod
- 
- *when installing a library with npm*
  - use the `-D` or `--save-dev` flag to install it as a devDependency
    - e.g. `npm i react -D` or `npm i react --save-dev`

- when doing a fresh `npm install` of all dependencies:
  - to install all prod dependencies add the production flag: `npm install --production`
  - else just use `npm install`

- Andrew also shows a way to put all the bundle.js/main.css files into `public/dist` instead of having them clutter up `public`
  - and also, because dev-server doesn't actually write the output files to disk (it just serves them up virtually),
    - it won't actually write anything to the public folder
    - it'll just be in an imaginary public/dist folder
    - if you look in the network tab in the browser console, you can see these 'imaginary' files being requested
    - (obviously if you do build:dev or build:prod then they'll appear there but dev-server itself doesn't need them)
- it's implemented slightly different in newer version of Webpack tho
  - in the index.html, put `/dist/` in front of the paths for the main.css and bundle.js
  - and in webpack.config.js, add `publicPath: '/dist/` to the `output` section
