import {Redirect} from "react-router";
import * as React from "react";
import {AuthService} from "../services/AuthService";

export default class Login extends React.Component<any, any> {
    public state = {
        redirectToPreviousRoute: false
    };

    public login = () => {
        AuthService.authenticate(() => {
            this.setState({redirectToPreviousRoute: true});
        });
    };

    public render() {
        const {from} = this.props.location.state || {from: {pathname: "/"}};
        const {redirectToPreviousRoute} = this.state;

        if (redirectToPreviousRoute) {
            return <Redirect to={from}/>;
        }

        return (
            <div>
                <p>You must log in to view the page at {from.pathname}</p>
                <button onClick={this.login}>Log in</button>
            </div>
        );
    }
}
