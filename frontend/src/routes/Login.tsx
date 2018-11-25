import * as React from "react";
import axios from "axios";
import {AuthService} from "../services/AuthService";
import {Button, FormGroup, InputGroup} from "@blueprintjs/core";

export default class Login extends React.Component<any, any> {
    public state = {
        email: "",
        password: "",
        isRequesting: false,
        isLoggedIn: false,
        data: [],
        error: "",
    };

    public constructor(props: any) {
        super(props);
    }


    public render() {
        return (
            (
                <div>
                    <h2>Login</h2>
                    <FormGroup
                        label="Label A"
                        labelFor="text-input"
                        labelInfo="(required)"
                    >
                        <form>
                            <InputGroup
                                id="email"
                                type={"email"}
                                placeholder="User email"
                                leftIcon="user"
                                disabled={this.state.isRequesting}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({email: e.target.value})}
                            />
                            <InputGroup
                                id="password"
                                type={"password"}
                                placeholder="User password"
                                leftIcon="lock"
                                disabled={this.state.isRequesting}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({password: e.target.value})}
                            />
                            <Button
                                text={"Login"}
                                type={"button"}
                                disabled={this.state.isRequesting}
                                onClick={this.handleLogin}
                            />
                        </form>
                    </FormGroup>
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
        } catch (error) {
            this.setState({error: "Something went wrong"});
        } finally {
            this.setState({isRequesting: false});
        }
    };
}
