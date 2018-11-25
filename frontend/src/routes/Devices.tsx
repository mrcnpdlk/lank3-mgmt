import * as React from "react";
import {AuthService} from "../services/AuthService";
import axios from "axios";
import {Button, Intent, Spinner} from "@blueprintjs/core";

interface IState {
    error: string | null,
    items: App.IDevice[],
    isRequesting: boolean
}


export default class Devices extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            items: [],
            isRequesting: false
        };
    }

    public async componentDidMount() {
        // this.setState({isLoggedIn: AuthService.isSessionValid()});
        await this.getTestData();
    }

    public render() {
        if (this.state.isRequesting) {
            return (
                <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD}/>
            );
        }
        return (
            <>
                <h2>Devices</h2>
                <table className="bp3-html-table bp3-html-table-condensed">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Host</th>
                        <th>Technologies</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.items.map(
                        (item: any) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.host}</td>
                                <td>
                                    <Button
                                        rightIcon="arrow-right"
                                        intent="success"
                                        text="Show"
                                        onClick={() => {
                                            this.onClickHandler(item.id);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </>
        );
    }

    private getTestData = async (): Promise<void> => {
        try {
            this.setState({error: "", isRequesting: true});
            const response = await axios.get<App.IDevice[]>("/api/items", {headers: AuthService.getAuthHeaders()});
            this.setState({items: response.data});
        } catch (error) {
            this.setState({error: "Something went wrong"});
        } finally {
            this.setState({isRequesting: false});
        }
    };

    private onClickHandler(deviceId: string) {
        console.log(deviceId);
    }
};
