import React, { Component } from 'react';
import Api from './api';
import ProfileUpdate from './profile_update';

class ProfileMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Authenticate: false,
            Type:""
        }
    }
    componentDidMount = () => {
        this.webCall();
    }

    //verifying token saved in server
    webCall = () => {
        fetch(Api + '/user/authenticate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: sessionStorage.getItem("userToken"),
                id: sessionStorage.getItem("userId"),
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.authenticate === 'true') {
                    this.setState({
                        Authenticate:true,
                        Type: responseData.type
                    })
                } else {
                    this.setState({
                        Authenticate: false,
                        Type: "none"
                    })
                    alert("Logout and try again!")
                    sessionStorage.clear();
                    window.location.reload();
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Logout and try again!")
                    sessionStorage.clear();
                    window.location.reload();
            });
    }

    render() {
        // render of there is no authentication,initially renders
        if(!this.state.Authenticate){
            return(
                <div className="spinner-border text-primary" style={{marginLeft:"50%"}}></div>
            )
        }
        //renders, if authenticate is true and user type is admin
        else if(this.state.Authenticate){
            return (
                <div style={{marginTop:"5vh"}}>
                    <ProfileUpdate/>
                </div>
            );
        }
        //renders, if authenticate is true,but user type is not admin 
        return(
            <div>
              <div className="spinner-border text-danger" style={{marginLeft:"50%"}}></div>
              <p style={{textAlign:'center'}}>Somewhat happened,logout and try again</p>
            </div>
        )
    }
}

 
export default ProfileMain;