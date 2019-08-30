This is a little example repository demonstrating how to make fetch requests within React.

### HelloStarWars.js
This makes a request, storing the result in state to re-render the component. This is the typical way React components have been built in the past. There are also some automated tests for it contained within `HelloStarWars.unit.js`

### HelloStarWarsHooks.js
This uses React hooks which produces a functional component and is much cleaner. It uses a custom hook `useFetch.js` to achieve this. Again this features some unit tests within `HelloStarWarsHooks.unit.js`. This did produce some warnings that can probably be eliminated with the latest version of React 16. (Due to trying to `await` an `act()`)
