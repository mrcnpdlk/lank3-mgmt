import * as React from "react";

interface IProps {
    history: any
}

export default class Home extends React.Component<IProps> {
    public componentWillMount() {
        this.props.history.push('/home');
    }

    public render() {
        return (
            <h2>Home</h2>
        );
    }
};
