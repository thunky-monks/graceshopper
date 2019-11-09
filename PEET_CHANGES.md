### PREVIOUS FLOW:

->already logged in user loads page:
-->(by magic(??), req.user is now the logged in user)
-->routes.js loads
--->componentDidMount() runs
---->cDM() gets the logged in user by:
------>dispatching the me() thunk
------>me() thunk calls axios.get on "/auth/me"
------>get("/auth/me") sends back req.user
------>me() thunk sends the GET_USER action with req.user as action.user
------>user-reducer sees GET_USER and puts action.user on state as state.user
---->cDM() gets the cart by:
------>dispatching the getCart() thunk
------>getCart() thunk calls axios.get on "/api/carts"
------>get("/api/carts") sends the cart corresponding to **req.user.id** (NOTE: state.user.id plays no role here)
------>getCart() sends the GOT_CART action with that cart as action.cart
------>cart-reducer sees GOT_CART and puts action.cart on state as state.cart
-->routes.js routes to the all-products-view, yadda yadda
->THEN the user clicks on the shopping cart link in the navbar
--><Link> in Navbar.js sends puts the path "/carts" onto the browser
-->routes.js sees "/carts" on the browser, correspondingly loads the CartView component
-->cart-view.js loads
--->componentDidMount() gets the cart again by dispatching getCart() thunk [NOTE: this was redundant]
--->render() runs
----> render() gets the cart from state, loads all the items, yadda yadda

### DESIRED CHANGES:

sarah's comment: "it shouldn't be '/api/carts', it should be '/api/users/20/cart' "
adding security to the routes (wasn't previously necessary until i implemented sarah's comment)

### NEW FLOW

(changes `bolded`)

->already logged in user loads page:
-->(by magic(??), req.user is now the logged in user)
-->routes.js loads
--->componentDidMount() runs
---->cDM() gets the logged in user `and their cart` by:
----->dispatching the me() thunk
----->me() thunk calls axios.get on "/auth/me"
----->get("/auth/me") sends back req.user as userRes.data
----->`me() thunk then calls axios.get on "/api/users/${userRes.data.id}/cart"`
----->`get("/api/users/:id/cart") checks whether req.params.id === req.user.id`
------->`if not, 503 it`
------->`if so, continue [and since we just set req.params.id to req.user's id, this is a sure thing]`
----->get(`"/api/users/:id/cart"`) then sends back the cart corresponding to `req.params.id (NOT req.user.id, although in this case they are ensured to be the same)`
----->me() thunk then sends the GET_USER action with req.user as action.user `and the cart as action.cart`
----->user-reducer sees GET_USER and puts action.user on state as state.user
----->cart-reducer sees `GET_USER` and puts action.cart on state as state.cart
-->routes.js routes to the all-products-view, yadda yadda
->THEN the user clicks on the shopping cart link in the navbar
--><Link> in Navbar.js sends puts the path "/users/${state.user.id}/carts" onto the browser
-->routes.js sees "/users/:id/carts" on the browser, correspondingly loads the CartView component
-->cart-view.js loads
--->componentDidMount() `does not` run `(commented out)`
--->render() runs
---->`render() checks whether the id from the browser path (this.props.match.params.id) === the user id on state (this.props.user.id)`
------>`if not, render() renders <Redirect> back to "/products"`
------>`if so,` render() gets the cart from state, loads all the items, yadda yadda

COMMENTS:
--the new organization of the server is more RESTful
--server/api/users.js prevents someone submitting a get request for "users/27/cart" unless they are logged in as user 27*
--client/components/cart-view.js prevents someone typing "users/27/cart" into the browser unless they are logged in as user 27*
--\*these can now be very very easily modified to allow an admin to do so
--`the me() thunk now gets the user's cart.`
--`the getCart() thunk is momentarily redundant, but will become useful when we add in the admin role; there we will not want to tie the cart to the user`
--`componentDidMount() on cart-view.js will also be needed for that purpose; currently it is commented out`
--i left server/api/carts.js in place and untouched, but it can ultimately be deleted
--i uncommented server/api/users.js, and server/api/index.js's call to it
