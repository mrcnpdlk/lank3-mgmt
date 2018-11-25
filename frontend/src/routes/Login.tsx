import * as React from "react";
import axios from "axios";
import {AuthService} from "../services/AuthService";

export default class Login extends React.Component<any, any> {
    public state = {
        email: "",
        password: "",
        isRequesting: false,
        isLoggedIn: false,
        data: [],
        error: "",
    };


    public render() {
        return (
            (
                <div>
                    (try the credentials: testuser@email.com / my-password)
                    <input
                        disabled={this.state.isRequesting}
                        placeholder="email"
                        type="text"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({email: e.target.value})}
                    />
                    <input
                        disabled={this.state.isRequesting}
                        placeholder="password"
                        type="password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.target.value})}
                    />
                    <button disabled={this.state.isRequesting} onClick={this.handleLogin}>Log in</button>
                </div>
            )
        );
    }


    private handleLogin = async (): Promise<void> => {
        const {email, password} = this.state;
        try {
            this.setState({error: ""});
            this.setState({isRequesting: true});
            const response = await axios.post<{ token: string; expiry: string }>("/api/users/login", {email, password});
            const {token, expiry} = response.data;
            AuthService.setSession(token, expiry);
            this.setState({isLoggedIn: true});

            console.log(this.state);
        } catch (error) {
            this.setState({error: "Something went wrong"});
        } finally {
            this.setState({isRequesting: false});
        }
    };
}
