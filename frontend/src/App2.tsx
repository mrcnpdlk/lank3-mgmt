import axios from "axios";
import * as React from 'react';
import {AuthService} from "./services/AuthService";

export interface AppState {
    email: string;
    password: string;
    isRequesting: boolean;
    isLoggedIn: boolean;
    data: App.Item[];
    error: string;
}

class App2 extends React.Component<{}, AppState> {
    public state = {
        email: "",
        password: "",
        isRequesting: false,
        isLoggedIn: false,
        data: [],
        error: ""
    };

    public componentDidMount() {
        this.setState({isLoggedIn: AuthService.isSessionValid()});
    }

    public render() {
        return (
            <div>
                <div>{this.state.error}</div>
                {this.state.isLoggedIn ? (
                    <div>
                        <div>
                            Server test data:
                            <ul>
                                {this.state.data.map((item: App.Item, index) => <li key={index}>name: {item.name} / value: {item.value}</li>)}
                            </ul>
                        </div>
                        <button disabled={this.state.isRequesting} onClick={this.getTestData}>Get test data</button>
                        <button disabled={this.state.isRequesting} onClick={this.logout}>Log out</button>
                    </div>
                ) : (
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
                )}
            </div>
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

    private logout = (): void => {
        AuthService.clearSession();
        this.setState({isLoggedIn: false});
    };

    private getTestData = async (): Promise<void> => {
        try {
            this.setState({error: ""});
            const response = await axios.get<App.Item[]>("/api/items", {headers: AuthService.getAuthHeaders()});
            this.setState({data: response.data});
        } catch (error) {
            this.setState({error: "Something went wrong"});
        } finally {
            this.setState({isRequesting: false});
        }
    }
}

export default App2;
