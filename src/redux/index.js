import {createBrowserHistory} from "history";

import {applyMiddleware, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import apiMiddleware from "./ApiMiddleware";
import {routerMiddleware} from "react-router-redux";
import {rootReducer} from "./reducers/RootReducer";

const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);

const middleWares = [thunkMiddleware, apiMiddleware, routeMiddleware].filter(
    Boolean
);

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(...middleWares)
        // ,
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
