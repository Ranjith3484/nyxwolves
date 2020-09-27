import React, { Component } from 'react';
import Api from './api';
import { Link } from 'react-router-dom';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Username: '',
            Email: '',
            Password: '',
            Type: '',
            sending: false
        }
    }

    handleChange(event) {
        this.setState({
            Username: event.target.value,
        })
    }
    handleChange1(event) {
        this.setState({
            Email: event.target.value,
        })
    }
    handleChange2(event) {
        this.setState({
            Password: event.target.value,
        })
    }

    addUser = () => {
        // eslint-disable-next-line
        var mailformat = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;

        if (this.state.Username === "") {
            alert("username is required");
        } else if (this.state.Email === "") {
            alert("Email is required");
        } else if (!this.state.Email.match(mailformat)) {
            alert("enter a valid email pattern")
        } else if (this.state.Password === "") {
            alert("Password is required");
        } else if (this.state.Type === "") {
            alert("Select an type");
        }
        else {
            this.setState({
                sending: true,
            })
            fetch(Api + '/user/register', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.Email,
                    name: this.state.Username,
                    password: this.state.Password,
                    type: this.state.Type
                })
            })
                .then((response) => response.json())
                .then((responseData) => {
                    if (responseData.message === 'Registered successfully') {
                        this.setState({
                            sending: false,
                        })
                        alert("Login to continue!")
                        this.props.history.push('/')
                    }
                    else {
                        alert(JSON.stringify(responseData.message))
                        this.setState({
                            sending: false,
                        })
                    }

                })
                .catch((error) => {
                    console.error(error);
                    this.setState({
                        sending: false,
                    })
                })
        }

    }

    render() {
        return (
            <div className="container">
                <div className="card container-fluid" style={{
                    width: "50vh", height: "70vh", marginTop: "15vh",
                    backgroundColor: '#cccccc', justifyContent: 'space-evenly'
                }}>
                    <h4 style={{ textAlign: 'center' }}>SignUp</h4>
                    <div className="form-group">
                        <label for="uname">Username:</label>
                        <input type="text" className="form-control" placeholder="Enter username" name="uname"
                            value={this.state.Username}
                            onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input type="text" className="form-control" placeholder="Enter email" name="email"
                            value={this.state.Email}
                            onChange={this.handleChange1.bind(this)} />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="pswd"
                            value={this.state.Password}
                            onChange={this.handleChange2.bind(this)} />
                    </div>
                    <label for="radio">Select Type:</label>
                        <div className="container-fluid">
                        <div className="radio">
                            <label><input type="radio" name="optradio" 
                            onClick={()=>{
                                this.setState({
                                    Type:"Student"
                                })
                            }}
                            />&ensp;Student</label>
                        </div>
                        <div className="radio">
                            <label><input type="radio" name="optradio" 
                             onClick={()=>{
                                this.setState({
                                    Type:"Faculty"
                                })
                            }}
                            />&ensp;Faculty</label>
                        </div>
                        </div>
                    {
                        this.state.sending ?
                            <button type="submit" className="btn btn-primary">
                                <div className="spinner-border"></div> Submitting...
                        </button>
                            :
                            <button type="submit" className="btn btn-primary"
                                onClick={() => {
                                    this.addUser();
                                }}
                            >Submit</button>
                    }
                    <Link to="/" style={{ textAlign: 'right', paddingRight: '10px' }}>Login</Link>
                </div>
            </div>
        );
    }
}

export default RegisterPage;