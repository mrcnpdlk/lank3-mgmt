import * as React from 'react';
import {Component, ReactNode} from 'react';
import {Alignment, Button, Navbar} from "@blueprintjs/core";
import * as Classes from "@blueprintjs/core/lib/esm/common/classes";
import {Link, Route, Switch} from "react-router-dom";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Devices from "./routes/Devices";
import SecretRouteComponent from "./components/SecretRouteComponent";


export default class App extends Component {
    public render(): ReactNode {
        return (
            <>
                <Navbar className={Classes.DARK}>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Navbar.Heading>Lan Kontroler</Navbar.Heading>
                        <Navbar.Divider/>
                        <Link to='/home' style={{textDecoration: 'none', color: 'white'}}>
                            <Button className="bp3-minimal" icon="home" text="Home"/>
                        </Link>
                        <Link to='/devices' style={{textDecoration: 'none', color: 'white'}}>
                            <Button className="bp3-minimal" icon="document" text="Devices"/>
                        </Link>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>
                        <Button className="bp3-minimal" icon={"user"}/>
                        <Button className="bp3-minimal" icon={"notifications"}/>
                        <Button className="bp3-minimal" icon={"cog"}/>
                    </Navbar.Group>
                </Navbar>
                <Switch>
                    <Route path={'/'} exact={true} render={props => <Home {...props}/>}/>
                    <Route path={'/home'} component={Home}/>
                    <Route path={'/login'} component={Login}/>
                    <SecretRouteComponent path={'/devices'} component={Devices}/>
                </Switch>
            </>
        );
    }
}

