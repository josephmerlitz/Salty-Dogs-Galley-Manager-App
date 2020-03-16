import React, { Component } from 'react';
import axios from 'axios';
import Dashboard from '../Dashboard';
import Moment from 'react-moment';
import './style.css';

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

    takeOrderHandler = (id, status) => {
        console.log(id);

        axios.put(`/api/updateStatus/${id}/${status}`).then(res => {
            if (res.data) {
                console.log(res.data);
                this.getOrders();
            }
        }).catch(err => console.log(err));

    }

    cancelOrderHandler = (id, status) => {
        console.log(id);

        axios.put(`/api/updateStatus/${id}/${status}`).then(res => {
            if (res.data) {
                console.log(res.data);
                this.getOrders();
            }
        }).catch(err => console.log(err));
    }

    completeOrderHandler = (id, status) => {
        console.log(id);

        axios.put(`/api/updateStatus/${id}/${status}`).then(res => {
            if (res.data) {
                console.log(res.data);
                this.getOrders();
            }
        }).catch(err => console.log(err));
    }

    orderDetailsCounter = (original) => {
        console.log(original);

        let compressed = [];

        let copy = original.slice(0);


        for (let i = 0; i < original.length; i++) {

            let myCount = 0;
            // loop over every element in the copy and see if it's the same
            for (let w = 0; w < copy.length; w++) {
                if (original[i] === copy[w]) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                    delete copy[w];
                }
            }

            if (myCount > 0) {
                let a = new Object();
                a.value = original[i];
                a.count = myCount;
                compressed.push(a);
            }
        }
        return compressed;
    };

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

        let dishKeyCounter = 0;

        return (
            <div className="container">

                <Dashboard dashboardStyle={dashboardStyle} viewName="Orders" />

                <div style={{ marginTop: "30px" }}></div>

                {this.state.orders.sort(

                    (a, b) => {
                        let statusA = a.orderStatus.toLowerCase(), statusB = b.orderStatus.toLowerCase()
                        if (statusA < statusB) //sort string desc
                            return 1
                        if (statusA > statusB)
                            return -1
                        return 0 //default return value (no sorting)
                    }

                ).map(item => (

                    <div key={item._id} className={item.orderStatus === "Pending" ? ("red-card") : (item.orderStatus === "Completed" ? ("teal-card") : (item.orderStatus === "Preparing" ? ("indigo-card") : ("sienna-card")))}>
                        {item.orderStatus === "Pending" ? (<div><p className="pendingStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderStatus}</p><p className="pendingStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderId}</p><p style={{ display: "inline-block" }}><Moment format="MM/DD/YYYY hh:mm">{item.orderDate}</Moment></p></div>) : (item.orderStatus === "Completed" ? (<div><p className="completedStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderStatus}</p><p className="completedStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderId}</p><p style={{ display: "inline-block" }}><Moment format="MM/DD/YYYY hh:mm">{item.orderDate}</Moment></p></div>) : (item.orderStatus === "Preparing" ? (<div><p className="preparingStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderStatus}</p><p className="preparingStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderId}</p><p style={{ display: "inline-block" }}><Moment format="MM/DD/YYYY hh:mm">{item.orderDate}</Moment></p></div>) : (<div><p className="cancelledStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderStatus}</p><p className="cancelledStatusStyle font-weight-bold mr-4" style={{ display: "inline-block" }}>{item.orderId}</p><p style={{ display: "inline-block" }}><Moment format="MM/DD/YYYY hh:mm">{item.orderDate}</Moment></p></div>)))}
                        {/*<h6>Order ID: {item.orderId}</h6>*/}

                        <p>Customer Name: <span className="font-weight-bold">{item.customerName}</span></p>
                        <p>Customer Address: <span className="font-weight-bold">{item.customerAddress}</span></p>
                        <p>Customer Email: <span className="font-weight-bold">{item.customerEmail}</span></p>
                        <p>Customer Phone: <span className="font-weight-bold">{item.customerPhone}</span></p>

                        <div className="row" key={dishKeyCounter++}>
                            <div className="col-6 text-right font-weight-bold">Item</div>
                            <div className="col-6 text-left">Count</div>
                        </div>
                        <div className="row" key={dishKeyCounter++}>
                            <div className="col-6 offset-3 text-right font-weight-bold"><hr /></div>
                        </div>
                        {
                            this.orderDetailsCounter(item.orderDetails).map(item => (
                                <div className="row" key={dishKeyCounter++}>
                                    <div className="col-6 text-right font-weight-bold">{item.value}</div>
                                    <div className="col-6 text-left">{item.count}</div>
                                </div>
                            ))
                        }

                        <div>
                            {item.orderStatus === "Pending" ? (<div className="mt-3">
                                <button className="btn btn-warning mr-2" onClick={() => this.cancelOrderHandler(item._id, 'Cancelled')}>Cencel Order</button>
                                <button className="btn btn-warning mr-2" onClick={() => this.takeOrderHandler(item._id, 'Preparing')}>Take Order</button>
                            </div>) :
                                (item.orderStatus === "Cancelled" ? (<div></div>) : item.orderStatus === "Preparing" ? (
                                    <div className="mt-3">
                                        <button className="btn btn-warning mr-2" onClick={() => this.cancelOrderHandler(item._id, 'Cancelled')}>Cencel Order</button>
                                        <button className="btn btn-warning mr-2" onClick={() => this.takeOrderHandler(item._id, 'Completed')}>Complete Order</button>
                                    </div>
                                ) : (<div></div>))
                            }
                        </div>

                    </div>

                ))}
            </div>
        )
    }
}

export default Orders;