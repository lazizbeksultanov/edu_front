import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import * as authActions from "../../redux/actions/AuthActions";
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Label} from "reactstrap";
import {connect} from "react-redux";

class Login extends Component {
    state = {
        variable: false
    }

    handleSignIn = async (e, v) => {
        this.props.dispatch(authActions.login({v, history: this.props.history}))
    };

    render() {
        const showHide = () => {
            this.setState({variable: !this.state.variable})

            let pwd = document.getElementById("pwd")

            this.state.variable ? pwd.type = "password" : pwd.type = "text"
        }

        return (
            <div className="container-fluid">
                <div className={"row"}>
                    <div className={"col-5 mx-auto registration"}>
                        <h1>Kirish</h1>
                        <div className={"firstInputs"}>
                            <AvForm className={"mx-auto col-8"} onValidSubmit={this.handleSignIn}>
                                <div className={"form-group"}>
                                    <Label for="usr" className="ml-0">Telefon raqam</Label>
                                    <AvField type="text" name="phoneNumber" className="form-control"
                                             placeholder="+998 90 1234567" id="usr" required/>
                                </div>
                                <div className={"form-group"}>
                                    <Label for="pwd" className="mr-sm-2">Parol</Label>
                                    <AvField type="password" className="form-control thirdInput" name="password"
                                             placeholder="Parol" id={"pwd"} required/>
                                </div>
                                <button className={"btn py-2 btn-block btn-primary"}>Kirish</button>
                            </AvForm>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    ({
         app: {showModal},
         auth: {isAdmin, isSuperAdmin, currentUser}
     }) => ({
        showModal,
        isAdmin,
        isSuperAdmin,
        currentUser
    })
)(Login);
