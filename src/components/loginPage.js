import React, { Component } from 'react';
import Api from './api';
import { Link } from 'react-router-dom';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '123',
            sending: false
        }
    }

    handleChange(event) {
        this.setState({
            Email: event.target.value,
        })
    }
    handleChange1(event) {
        this.setState({
            Password: event.target.value,
        })
    }

    logMeIn = () => {
        // eslint-disable-next-line
                var mailformat = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
               
                if (this.state.Email === "") {
                    alert("Email is required");
                } else if (!this.state.Email.match(mailformat)) {
                    alert("enter a valid email pattern")
                } else if (this.state.Password === "") {
                    alert("Password is required");
                } 
                else {
                    this.setState({
                        sending: true,
                    })
                    fetch(Api + '/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email: this.state.Email,
                            password: this.state.Password
                        })
                    })
                        .then((response) => response.json())
                        .then((responseData) => {
                            if (responseData.message === "Login successful") {
                                this.setState({
                                    sending: false,
                                })
                                alert(responseData.message);
                                sessionStorage.setItem("userId", responseData.userid);
                                sessionStorage.setItem("userToken", responseData.token);
                                sessionStorage.setItem("userEmail", responseData.email);
                                sessionStorage.setItem("userName", responseData.name);
                                sessionStorage.setItem("userType", responseData.type);

                                if(responseData.type === 'Student'){
                                    this.props.history.push('/home/student')
                                }else if(responseData.type === 'Faculty'){
                                    this.props.history.push('/home/faculty')
                                }else{
                                    this.props.history.push('/')
                                }
                            }
                            else {
                                alert(responseData.message)
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
                <div className="card container-fluid" style={{width:"50vh",height:"50vh",marginTop:"25vh",
                backgroundColor:'#cccccc',justifyContent:'space-evenly'}}>
                    <h4 style={{textAlign:'center'}}>SignIn1</h4>
                    <div className="form-group">
                        <label for="uname">Email:</label>
                        <input type="text" className="form-control" placeholder="Enter email" name="email" 
                         value={this.state.Email}
                         onChange={this.handleChange.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label for="pwd">Password:</label>
                        <input type="password" className="form-control" placeholder="Enter password" name="pswd" 
                         value={this.state.Password}
                         onChange={this.handleChange1.bind(this)}
                        />
                    </div>
                    {
                        this.state.sending ?
                        <button type="submit" className="btn btn-primary">
                           <div className="spinner-border"></div> Submitting...
                        </button>
                        :
                        <button type="submit" className="btn btn-primary"
                        onClick={()=>{
                            this.logMeIn();
                        }}
                        >Submit</button>
                    }
                    <Link to="/register" style={{textAlign:'right',paddingRight:'10px'}}>register</Link>
                </div>
            </div>
        );
    }
}

export default LoginPage;
