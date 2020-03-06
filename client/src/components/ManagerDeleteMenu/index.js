import React, { Component } from 'react';
import axios from 'axios';

class ManagerDeleteMenu extends Component {
    getMenuItems = () => {
        axios.get('/api/menuItems').then(res => {
            if (res.data) {
                console.log(res.data);
            }
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.getMenuItems();
    }

    render() {
        return (
            <div>
                <h1>delete form</h1>
            </div>
        )
    }
}

export default ManagerDeleteMenu;