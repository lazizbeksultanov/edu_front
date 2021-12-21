import React from 'react';
import {Route} from 'react-router-dom';
import {useDispatch} from "react-redux";

const PublicRoute = ({component: Component, ...rest}) => {
    const dispatch = useDispatch()

    window.onhashchange = null;
    return (<Route
            {...rest}
            render={props =>
                <Component {...props}/>
            }
        />
    )
};
export default PublicRoute;
