import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  Link
} from "react-router-dom";
import './style.css';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    let displayMenu = null;

    if (this.props.viewName && this.props.viewName === "Dashboard") {
      displayMenu = (
        <div className="container" style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", justifyContent: "center" }}>
          <Link className="btn dashboardStyling" style={this.props.dashboardStyle} to="/add"><i className="fa fa-plus"></i></Link>
          <Link className="btn dashboardStyling" style={this.props.dashboardStyle} to="/edit"><i className="fa fa-edit"></i></Link>
          <button style={this.props.dashboardStyle} onClick={this.onLogoutClick} className="btn dashboardStyling"><i className="fa fa-sign-out"></i></button>
        </div >
      )
    } else if (this.props.viewName && this.props.viewName === "AddItem") {
      displayMenu = (
        <div className="container" style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", justifyContent: "center" }}>
          <Link className="btn otherMenusStyling" style={this.props.dashboardStyle} to="/edit"><i className="fa fa-edit"></i></Link>
          <button style={this.props.dashboardStyle} onClick={this.onLogoutClick} className="btn otherMenusStyling"><i className="fa fa-sign-out"></i></button>
        </div >
      )
    } else if (this.props.viewName && this.props.viewName === "EditItem") {
      displayMenu = (
        <div className="container" style={{ display: "flex", flexWrap: "wrap", marginTop: "20px", justifyContent: "center" }}>
          <Link className="btn otherMenusStyling" style={this.props.dashboardStyle} to="/add"><i className="fa fa-plus"></i></Link>
          <button style={this.props.dashboardStyle} onClick={this.onLogoutClick} className="btn otherMenusStyling"><i className="fa fa-sign-out"></i></button>
        </div >
      )
    }



    return (

      displayMenu

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
