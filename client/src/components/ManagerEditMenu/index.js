import React, { Component } from 'react';
import axios from 'axios';
import ManagerEditScreenSearchBox from '../ManagerEditScreenSearchBox'

class ManagerEditMenu extends Component {


    state = {
        menuItems: [],
        name: '',
        dishDetails: '',
        file: '',
        inputFileName: '',
        dishPrice: ''
    };

    getMenuItems = () => {
        axios.get('/api/menuItems').then(res => {
            if (res.data) {
                console.log(res.data)
                this.setState({ menuItems: res.data, inputFileName: '' });
            }
        }).catch(err => console.log(err));
    }

    filterMenuItems = (textBoxVal) => {
        axios.get('/api/menuItems').then(res => {
            if (res.data) {
                console.log(res.data);
                let filteredArray = res.data.filter(item => item.name.toLowerCase().includes(textBoxVal.toLowerCase()));
                console.log(filteredArray);
                this.setState({ menuItems: filteredArray });
            }
        }).catch(err => console.log(err));
    }

    componentDidMount() {
        this.getMenuItems();
    }

    onClickDeleteEvent = (id) => {
        console.log(id);
        axios.delete(`/api/menuItems/${id}`).then(res => {
            if (res.data) {
                console.log(res.data);
                this.getMenuItems();
            }
        }).catch(err => console.log(err));
    }

    onChangeHandler = (e) => {
        this.setState({ name: e.target.value }, () => console.log(this.state))
    }

    onClickSaveEvent = (itemId) => {
        const formData = new FormData();
        formData.append('itemId', itemId);
        formData.append('imagesUploader', this.state.file);
        formData.append('name', this.state.name);
        formData.append('dishDetails', this.state.dishDetails);
        formData.append('dishPrice', this.state.dishPrice);

        axios.put(`/api/menuItems/${itemId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(
            res => {
                if (res.data) {
                    console.log(res.data);
                    this.getMenuItems();
                }
            }
        ).catch(err => console.log(err));
    }

    render() {
        return (
            <div>

                <ManagerEditScreenSearchBox filterMenuItems={this.filterMenuItems} />

                <div className="row">
                    {this.state.menuItems.map(item => (
                        <div className="col s12 m6 l4" key={item._id}>
                            <div className="card">
                                <div className="card-image">
                                    <img src={item.imgSrc} alt={item._id} />
                                </div>
                                <div className="card-content white-text">
                                    <input type="text" defaultValue={item.name} onChange={this.onChangeHandler} />
                                    <input type="text" defaultValue={item.dishDetails} onChange={(e) => this.setState({ dishDetails: e.target.value }, () => console.log(this.state))} />
                                    <input type="text" defaultValue={item.dishPrice} onChange={(e) => this.setState({ dishPrice: e.target.value }, () => console.log(this.state))} />
                                    <div className="file-field input-field">
                                        <div className="btn">
                                            <span>Upload New Image</span>
                                            <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] }, () => console.log(this.state))} id="imagesUploader" name="imagesUploader" />
                                        </div>
                                        <div className="file-path-wrapper">
                                            <input className="file-path validate" type="text" value={this.state.inputFileName} />
                                        </div>
                                    </div>

                                </div>
                                <div className="card-action">
                                    <div className="row">
                                        <div className="col s12 m12 l6">
                                            <button type="submit" className="btn" onClick={() => this.onClickSaveEvent(item._id)} style={{ marginRight: "20px", marginBottom: "20px", width: "100%" }}>Save Changes</button>
                                        </div>
                                        <div className="col s12 m12 l6">
                                            <button type="submit" className="btn" onClick={() => this.onClickDeleteEvent(item._id)} style={{ marginRight: "20px", marginBottom: "20px", width: "100%" }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default ManagerEditMenu;