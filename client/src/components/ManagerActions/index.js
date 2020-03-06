import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import ManagerAddMenuForm from '../ManagerAddMenuForm';
import ManagerEditMenu from '../ManagerEditMenu';

class ManagerActions extends Component {
    render() {
        return (
            <div className="row container" style={{ marginTop: "50px" }}>
                <Router>
                    <div className="col l6 s12 m6">
                        <Link className="btn" style={{ width: "100%", marginBottom: "25px", color: "white" }} to="/add">Add New Menu Item</Link>
                    </div>
                    <div className="col l6 s12 m6">
                        <Link className="btn" style={{ width: "100%", marginBottom: "25px", color: "white" }} to="/edit">Edit Menu Items</Link>
                    </div>
                    <Switch>
                        <Route exact path="/">
                            <ManagerAddMenuForm />
                        </Route>
                        <Route path="/add">
                            <ManagerAddMenuForm />
                        </Route>
                        <Route path="/edit">
                            <ManagerEditMenu />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default ManagerActions;