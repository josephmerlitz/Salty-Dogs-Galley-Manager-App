import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard';

class Orders extends Component {


    state = {
        orders: []
    };

    getOrders = () => {
        axios.get('/api/getOrders').then(res => {
            if (res.data) {
                console.log(res.data);
                this.setState({ orders: res.data });
            }
        }).catch(err => console.log(err));
    }



    componentDidMount() {
        console.log('object')
        this.getOrders();
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
            <div className="container">

                <Dashboard dashboardStyle={dashboardStyle} viewName="Orders" />

                <ul className="list-group my-5">
                    {this.state.orders.map(item => (
                        <li key={item._id} className="list-group-item">
                            <div className="row">
                                <div className="col-4"><p>{item.customerName}</p></div>
                                <div className="col-4"><p>{item.orderId}</p></div>
                                <div className="col-4"><p>{item.customerAddress}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-4"><p>{item.customerEmail}</p></div>
                                <div className="col-4"><p>{item.customerPhone}</p></div>
                                <div className="col-4"><p>{item.orderDetails}</p></div>
                            </div>
                            <div className="row">
                                <div className="col-4"><p>{item.orderDate}</p></div>
                                <div className="col-4">{item.orderStatus === "Pending" ? (<p className="text-danger">{item.orderStatus}</p>) : (<p className="text-dark">{item.orderStatus}</p>)}</div>
                                <div className="col-4"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Orders;