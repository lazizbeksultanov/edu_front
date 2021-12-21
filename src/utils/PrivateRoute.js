import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {userMe} from "../redux/actions/AuthActions";
import {TOKEN} from "./constants";


const PrivateRoute = ({dispatch, auth, path, history, location, component: Component, ...rest}) => {
    dispatch(userMe())


    const filterRole = (props) => {
        const role = localStorage.getItem('role');
        if (role === 'admin' || role === 'superAdmin') {
            if (path.includes('/admin')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        } else if (role === 'agent') {
            if (path.includes('/agent')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        } else if (role === 'user') {
            if (path.includes('/client')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        } else if (role === 'corporateAdmin') {
            if (path.includes('corporate')) {
                return <Component {...props} />
            } else return <Redirect to={'/badRequest'}/>
        }
    }

    return (
        <Route
            path={path}
            {...rest}
            render={(props) =>
                localStorage.getItem(TOKEN) != null ? (
                    filterRole(props)
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}
export default connect(({privateRoute, auth}) => ({privateRoute, auth}))(
    withRouter(PrivateRoute)
);
