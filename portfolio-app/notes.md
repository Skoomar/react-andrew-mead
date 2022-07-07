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