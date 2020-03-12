import React, { Component } from 'react';

class SearchBox extends Component {

    state = {
        searchValue: ""
    }

    onChangeHandler = (event) => {
        const searchBoxValue = event.target.value;
        this.setState({ searchValue: searchBoxValue }, () => this.props.filterMenuItems(searchBoxValue));
    }

    render() {
        return (
            <div className="row px-5 mt-4">
                <input className="form-input form-control bg-light" style={{ height: "50px", borderRadius: "10px" }} type="text" name="searchBox" value={this.state.searchValue} onChange={this.onChangeHandler} placeholder="Search by Name ..." />
            </div>
        )
    }
}

export default SearchBox;