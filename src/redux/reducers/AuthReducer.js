import {createReducer} from "../../utils/StoreUtils";
import * as authActionTypes from "../actionTypes/AuthActionTypes";
import {TOKEN} from "../../utils/constants";

const initState = {
    loading: false,
    modalShow: false,
    mainMenu: false,
    currentUser: "",
    token: null,
    text: null,
    signUp: false,
    login: false,
    isSuperAdmin: false,
    isAdmin: false,
    isAgent: false,
    isClient: false,
    isUser: false,
    verifyEmail: false,
    verifyUser: false,
    userSharingDiscount: 0,
    parsedToken: null,
    sharingUserId: null,
    alert_mes: "",
    sentUserMe: false,
    permissions: [],
    menuHidden: true,
    addMenu: false,
    addMenu1: false
};

const reducers = {
    [authActionTypes.REQUEST_AUTH_START](state) {
        state.loading = true;
    },
    [authActionTypes.REQUEST_VERIFY_EMAIL_SUCCESS](state, payload) {
        state.verifyEmail = true;
    },
    [authActionTypes.AUTH_GET_USER_TOKEN_SUCCESS](state, action) {
        state.currentUser = action.payload;
        state.modalShow = false;
    },
    [authActionTypes.REQUEST_API_ERROR](state, action) {
        // state.text = action.payload.data
        state.text = "Error";
    },
    [authActionTypes.AUTH_GET_CURRENT_USER_REQUEST](state) {
        state.loading = true;
        state.sentUserMe = true;
    },
    [authActionTypes.AUTH_GET_CURRENT_USER_ERROR](state) {
        state.currentUser = "";
    },
    [authActionTypes.AUTH_LOGOUT](state) {
        localStorage.removeItem(TOKEN);
        state.currentUser = "";
        state.sentUserMe = false;
    },
    [authActionTypes.REQ_ALERT](state, payload) {
        state.alert_mes = payload.payload;
    },
    [authActionTypes.AUTH_REGISTER_USER_SUCCESS](state, action) {
        state.signUp = action.payload.success;
        state.modalShow = false;
    },
    [authActionTypes.SET_CURRENT_USER](state, action) {
        state.currentUser = action.payload;
    },
    [authActionTypes.AUTH_LOGIN_USER_SUCCESS](state) {
        state.login = true;
    },
    [authActionTypes.CHANGE_SIGN_UP](state, action) {
        state.signUp = action.payload;
    },
    [authActionTypes.CHANGE_LOGIN](state, action) {
        state.login = action.payload;
    },
    updateState(state, {payload}) {
        return {
            ...state,
            ...payload,
        };
    },
};

export default createReducer(initState, reducers);
