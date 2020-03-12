import React, { Component } from 'react';
import axios from 'axios';
import SearchBox from '../SearchBox';
import Dashboard from '../Dashboard';

class EditItemsForm extends Component {


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

        const dashboardStyle = {
            width: "70px",
            height: "70px",
            margin: "25px",
            color: "white",
            fontSize: "35px",
            backgroundColor: "CadetBlue",
            lineHeight: "57.5px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 20px 20px 0 rgba(0, 0, 0, 0.8)"
        }

        return (
            <div className="container-fluid">

                <Dashboard dashboardStyle={dashboardStyle} viewName="EditItem" />

                <SearchBox filterMenuItems={this.filterMenuItems} />

                <div className="row px-5 mt-3">
                    {this.state.menuItems.map(item => (
                        <div className="col-sm-12 col-md-12 col-lg-6 col-xl-4 p-4" key={item._id} >
                            <div className="card" style={{ borderRadius: "10px", boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)" }}>
                                <div className="card-img-top p-3">
                                    <img src={item.imgSrc} className="img-thumbnail" alt={item._id} />
                                </div>
                                <div className="card-body">
                                    <input className="form-control my-3" type="text" defaultValue={item.name} onChange={this.onChangeHandler} />
                                    <input className="form-control my-3" type="text" defaultValue={item.dishDetails} onChange={(e) => this.setState({ dishDetails: e.target.value }, () => console.log(this.state))} />
                                    <input className="form-control my-3" type="text" defaultValue={item.dishPrice} onChange={(e) => this.setState({ dishPrice: e.target.value }, () => console.log(this.state))} />


                                    <div className="custom-file">
                                        <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] }, () => console.log(this.state))} id="imagesUploader" name="imagesUploader" className="custom-file-input" />
                                        <label className="custom-file-label" forhtml="validatedCustomFile">Choose file...</label>
                                    </div>

                                    <div className="row mt-3">
                                        <div className="col-sm-12 col-md-12 col-lg-6 my-2">
                                            <button type="submit" className="btn" onClick={() => this.onClickSaveEvent(item._id)} style={{ width: "100%", backgroundColor: "CadetBlue" }}>Save Changes</button>
                                        </div>
                                        <div className="col-sm-12 col-md-12 col-lg-6 my-2">
                                            <button type="submit" className="btn" onClick={() => this.onClickDeleteEvent(item._id)} style={{ width: "100%", backgroundColor: "CadetBlue" }}>Delete</button>
                                        </div>
                                    </div>

                                    {/* <div className="file-field input-field">
                                    <div className="btn">
                                        <span>Upload New Image</span>
                                        <input type="file" onChange={(e) => this.setState({ file: e.target.files[0] }, () => console.log(this.state))} id="imagesUploader" name="imagesUploader" />
                                    </div>
                                    <div className="file-path-wrapper">
                                        <input className="file-path validate" type="text" value={this.state.inputFileName} />
                                    </div>
                                </div> */}

                                </div>
                                {/* <div className="card-action">
                                <div className="row">
                                    <div className="col s12 m12 l6">
                                        <button type="submit" className="btn" onClick={() => this.onClickSaveEvent(item._id)} style={{ marginRight: "20px", marginBottom: "20px", width: "100%" }}>Save Changes</button>
                                    </div>
                                    <div className="col s12 m12 l6">
                                        <button type="submit" className="btn" onClick={() => this.onClickDeleteEvent(item._id)} style={{ marginRight: "20px", marginBottom: "20px", width: "100%" }}>Delete</button>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default EditItemsForm;