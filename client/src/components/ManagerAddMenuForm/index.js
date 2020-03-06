import React, { Fragment, useState } from 'react';
import axios from 'axios';

const ManagerAddMenuForm = () => {

    const [name, setName] = useState('');
    const [dishDetails, setDishDetails] = useState('');
    const [file, setFile] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [fileNameAndPath, setFileNameAndPath] = useState('');

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
                setFileNameAndPath('');
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

    return (
        <Fragment>
            <div>
                <div className="row">
                    <div className="col l6 offset-l3 m10 offset-m1">
                        <div className="card">
                            <form onSubmit={handleSubmit}>
                                <div className="card-content white-text">
                                    <span className="card-title"><input type="text" onChange={(e) => setName(e.target.value)} placeholder="Enter Dish Name ..." name="name" value={name} /></span>
                                    <span className="card-title"><input type="text" onChange={(e) => setDishDetails(e.target.value)} placeholder="Enter Dish Details ..." name="dishDetails" value={dishDetails} /></span>
                                    <span className="card-title"><input type="text" onChange={(e) => setDishPrice(e.target.value)} placeholder="Enter Dish Price ..." name="dishPrice" value={dishPrice} /></span>
                                    <span className="card-title">
                                        <div className="file-field input-field">
                                            <div className="btn">
                                                <span>Upload Image</span>
                                                <input type="file" id="imagesUploader" name="imagesUploader" onChange={(e) => setFile(e.target.files[0])} />
                                            </div>
                                            <div className="file-path-wrapper">
                                                <input className="file-path validate" type="text" onChange={(e) => setFileNameAndPath(e.target.value)} name="fileNameAndPath" value={fileNameAndPath} />
                                            </div>
                                        </div>
                                    </span>
                                </div>
                                <div className="card-action">
                                    <div className="center">
                                        <input className="btn " type="submit" style={{ width: "50%" }} value="Add Menu Item" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ManagerAddMenuForm;