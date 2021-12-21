import {combineReducers} from "redux";
import auth from "./AuthReducer";
import app from "./AppReducers";
import {routerReducer} from "react-router-redux";


export const rootReducer = combineReducers({
    router:routerReducer,
    auth,
    app
})