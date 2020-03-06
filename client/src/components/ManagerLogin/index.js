import React, { Component } from 'react';

class ManagerLogin extends Component {
    render() {
        return (
            <div className="row container" style={{ marginTop: "50px" }}>
                <Router>
                    <Switch>
                        <Route path="/manager">
                            <ManagerLogin />
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default ManagerLogin;