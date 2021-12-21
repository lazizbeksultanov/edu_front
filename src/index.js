import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';
import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


const app = (
    <>
        <ToastContainer/>
        <BrowserRouter><App/></BrowserRouter>
    </>
);
ReactDOM.render(app, document.getElementById("root"));
