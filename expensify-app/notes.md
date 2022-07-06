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