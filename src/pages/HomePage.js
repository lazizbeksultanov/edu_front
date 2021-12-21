import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

class HomePage extends Component {
    render() {
        return (
            <div>
                <h1>
                    Assalomu Alaykum! Admin CRM sistemasiga saytga hush kelibsiz!
                </h1>
                <Link to="/login" >Kirish</Link>
            </div>
        );
    }
}

HomePage.propTypes = {};

export default HomePage;
