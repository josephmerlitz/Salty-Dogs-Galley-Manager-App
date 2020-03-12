import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './style.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container p-5" style={{ justifyContent: "center", alignItems: "center" }}>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="card mt-5 mx-auto loginFormCard">
            <div className="card-header border-light text-center text-white" style={{
              fontFamily: "'Josefin Sans', sans-serif",
              fontSize: "30px",
              color: "#fff",
              lineHeight: "1.2",
              textAlign: "center",
              display: "block",
              width: "100%",
              top: "0",
              left: "0",
              backgroundColor: "CadetBlue",
              paddingTop: "50px",
              paddingBottom: "39px",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
            >Try it out!
            </div>
            <div className="card-body text-dark">
              <div className="form-group col col-sm-12 col-lg-10 offset-lg-1 col-md-10 offset-md-1">
                {
                  Object.keys(errors).length !== 0 ?
                    Object.keys(errors).map(key => <div className="alert alert-danger" role="alert" key={key} value={key}><i class="fa fa-exclamation-circle"></i> {errors[key]}</div>)
                    : <div></div>
                }
                <input
                  autoComplete="off"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("form-control bg-light whenHover", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                  style={{

                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "15px",
                    color: "#1b3815",
                    lineHeight: "1.2",
                    position: "relative",
                    display: "block",
                    width: "100%",
                    height: "55px",
                    background: "#ebebeb",
                    borderRadius: "27px",
                    padding: "0 35px 0 35px",
                    marginBottom: "25px"

                  }}
                  placeholder="Email"
                />
              </div>
              <div className="form-group col col-sm-12 col-lg-10 offset-lg-1 col-md-10 offset-md-1">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("form-control bg-light whenHover", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                  style={{

                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "15px",
                    color: "#1b3815",
                    lineHeight: "1.2",
                    position: "relative",
                    display: "block",
                    width: "100%",
                    height: "55px",
                    background: "#ebebeb",
                    borderRadius: "27px",
                    padding: "0 35px 0 35px",
                    marginBottom: "25px"

                  }}
                  placeholder="Password"
                />
              </div>
              <div className="form-group col col-sm-12 col-lg-10 offset-lg-1 col-md-10 offset-md-1">
                <button
                  style={{


                    justifyContent: "center",
                    alignItems: "center",
                    padding: "0 20px",
                    width: "100%",
                    height: "50px",
                    backgroundColor: "CadetBlue",
                    borderRadius: "25px",
                    fontFamily: "'Josefin Sans', sans-serif",
                    fontSize: "15px",
                    color: "#fff",
                    lineHeight: 1.2,
                    textTransform: "uppercase",
                    transition: "all 0.4s",
                    marginBottom: "25px"


                  }}
                  type="submit"
                  className="btn btn-success form-control whenHover"
                >
                  Login
              </button>
              </div>
            </div>
          </div>
        </form>
      </div >
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
