import React, { Component } from 'react';

class ManagerEditScreenSearchBox extends Component {

    state = {
        searchValue: ""
    }

    onChangeHandler = (event) => {
        const searchBoxValue = event.target.value;
        this.setState({ searchValue: searchBoxValue }, () => this.props.filterMenuItems(searchBoxValue));
    }

    render() {
        return (
            <div style={{ marginBottom: "20px" }} className="center">
                <input className="container" style={{ width: "80%" }} type="text" name="searchBox" value={this.state.searchValue} onChange={this.onChangeHandler} placeholder="Search by Name ..." />
            </div>
        )
    }
}

export default ManagerEditScreenSearchBox;