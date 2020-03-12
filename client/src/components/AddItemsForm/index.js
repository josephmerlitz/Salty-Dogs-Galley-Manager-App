import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard';
import './style.css';

const AddItemsForm = () => {

    const [name, setName] = useState('');
    const [dishDetails, setDishDetails] = useState('');
    const [file, setFile] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    /* const [fileNameAndPath, setFileNameAndPath] = useState(''); */

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('imagesUploader', file);
        formData.append('name', name);
        formData.append('dishDetails', dishDetails);
        formData.append('dishPrice', dishPrice);

        try {
            await axios.post('/api/menuItems', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(() => {
                console.log('File Uploaded');
                setName('');
                setDishDetails('');
                setFile('');
                /* setFileNameAndPath(''); */
                setDishPrice('');
            });
        } catch (err) {
            if (err.response.status === 500) {
                console.log('There was a problem with the server');
            } else {
                console.log(err.response.data.msg);
            }
        }
    }


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
        <Fragment>
            <div className="container">

                <Dashboard dashboardStyle={dashboardStyle} viewName="AddItem" />

                <div className="card p-5 mt-5 addCardWidth mx-auto" style={{ borderRadius: "20px", boxShadow: "0 3px 20px 0px rgba(0, 0, 0, 0.1)" }}>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <input className="form-control my-3" style={{}} type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Dish Name ..." name="name" value={name} />
                            <input className="form-control my-3" type="text" onChange={(e) => setDishDetails(e.target.value)} placeholder="Enter Dish Details ..." name="dishDetails" value={dishDetails} />
                            <input className="form-control my-3" type="text" onChange={(e) => setDishPrice(e.target.value)} placeholder="Enter Dish Price ..." name="dishPrice" value={dishPrice} />


                            {/* <div className="file-path-wrapper">
                                <input className="file-path validate" type="text" onChange={(e) => setFileNameAndPath(e.target.value)} name="fileNameAndPath" value={fileNameAndPath} />
                            </div> */}






                            <div className="custom-file">
                                <input type="file" id="imagesUploader" name="imagesUploader" onChange={(e) => setFile(e.target.files[0])} className="custom-file-input" />
                                <label className="custom-file-label" forhtml="validatedCustomFile">Choose file...</label>
                            </div>






                            <div className="text-center">
                                <button
                                    style={{ width: "50%", backgroundColor: "CadetBlue", textTransform: "uppercase" }}
                                    type="submit"
                                    className="btn mt-5 text-white"
                                >Add Menu Item</button>
                            </div>
                        </div>

                    </form>
                </div>

            </div>
        </Fragment>
    )
}

export default AddItemsForm;