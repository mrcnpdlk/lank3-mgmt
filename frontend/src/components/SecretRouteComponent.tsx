import {Redirect, Route, RouteProps} from "react-router";
import * as React from "react";
import {AuthService} from "../services/AuthService";

export default class SecretRouteComponent extends React.Component<RouteProps> {
    constructor(props: RouteProps) {
        super(props)
    }

    public render() {
        return (
            AuthService.isAuthenticated
                ? <Route {...this.props} />
                : <Redirect to='/login'/>
        );
    }
}
