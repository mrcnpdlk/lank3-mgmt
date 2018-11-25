import {Button, Intent, Spinner} from '@blueprintjs/core';
import * as React from "react";

interface IDevice {
    id: string;
    host: string;
    login: string | null;
    password: string | null;
    ver: number;
    token: string;
}

interface IState {
    error: any;
    isLoaded: boolean;
    items: IDevice[];
}

export default class Devices extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    public componentDidMount() {
        fetch('http://localhost:3001/devices')
            .then(res => res.json())
            .then(
                (list: IDevice[]) => {
                    this.setState({
                        isLoaded: true,
                        items: list
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    public render() {
        const {error, isLoaded, items} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <Spinner intent={Intent.PRIMARY} size={Spinner.SIZE_STANDARD}/>
            );
        } else {
            return (
                <table className="bp3-html-table bp3-html-table-condensed">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Host</th>
                        <th>Technologies</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(
                        (item: IDevice) => (
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
            );
        }
    }

    private onClickHandler(deviceId: string) {
        console.log(deviceId);
    }
};
