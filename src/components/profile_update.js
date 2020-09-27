import React, { Component } from 'react';
import Api from './api';
import axios from 'axios';

class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            sending: true,
            ImageUploadVisible:false,
            Name: "",
            Email:"",
            PhoneNumber:"",
            profileImg:"",
            ImgUpload:'',
            About:"",
            City:"",
            Country:"",
            Company:"",
            School: "",
            HomeTown: "",
            Languages: "",
            Gender: ""
        }
    }
    componentDidMount = () => {
        this.webCall();
    }

    webCall = async () => {
        fetch(Api + '/get/an/user', {
            method: 'GET',
            headers: {
                'id': await sessionStorage.getItem('userId'),
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    sending: false,
                    Name: responseJson[0].name,
                    Email:responseJson[0].email,
                    PhoneNumber:responseJson[0].phone,
                    profileImg:responseJson[0].profileImg[0],
                    About:responseJson[0].about,
                    City:responseJson[0].city,
                    Country:responseJson[0].country,
                    Company:responseJson[0].company,
                    School: responseJson[0].school,
                    HomeTown: responseJson[0].hometown,
                    Languages: responseJson[0].languages,
                    Gender: responseJson[0].gender

                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    sending: false
                })
            });
    }

    handleChange (evt, field) {
        this.setState({ [field]: evt.target.value });
    }

    onFileChange(e) {
        this.setState({ ImgUpload: e.target.files[0] });
        this.onSubmit(e);
    }

    onSubmit(e) {
        this.setState({
            sending: true
        })
        //  e.preventDefault()

            var formData = new FormData()
            formData.append('id',sessionStorage.getItem('userId'))
            formData.append('profileImg', e.target.files[0]);
            axios.put(Api + "/update/profile", formData, {
            })
                .then(res => {
                    if(res.data.message === 'Profile Updated'){
                        alert(res.data.message);
                        this.setState({
                            sending: false
                        })
                    } else{
                        alert(res.data.message);
                        this.setState({
                            sending: false
                        })
                    }
                    
                }).catch((err) => {
                   alert("Try again");
                   this.setState({
                    sending: false
                   })
                   console.log(err)
                  });
    }

    profileUpdate=async()=>{
        this.setState({
            sending: true,
        })
        fetch(Api + '/update/profile/details', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            'id': await sessionStorage.getItem('userId'),
            'name': this.state.Name,
            'phone': this.state.PhoneNumber,
            'email': this.state.Email,
            'about': this.state.About,
            'city': this.state.City,
            'country': this.state.Country,
            'company': this.state.Company,
            'school': this.state.School,
            'hometown': this.state.HomeTown,
            'languages': this.state.Languages,
            'gender': this.state.Gender
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.message === "Profile Updated") {
                    this.setState({
                        sending: false,
                    })
                    alert(responseData.message);
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

    render() { 
        return ( 
            <div className="container-fluid card" style={{marginTop:"50px",width:"70vh",marginBottom:"50px"}}>
                 <h6 style={{color:'grey'}}>Hi, {this.state.Name}</h6>
                 <div className="row">
                    <div className="col-md-6">
                    {
                        this.state.profileImg ?
                        <img src={this.state.profileImg} 
                        alt='your profile' className='center'
                        height={140}
                        width={140}
                        style={{
                            borderRadius: 70, marginTop: "2%", marginBottom: "2%",
                            display: 'block', marginLeft: 'auto', marginRight: 'auto'
                        }}
                       />
                    :
                    <img src="https://static.toiimg.com/thumb/72975551.cms?width=680&height=512&imgsize=881753" 
                    alt='your profile' className='center'
                        height={140}
                        width={140}
                        style={{
                            borderRadius: 70, marginTop: "2%", marginBottom: "2%",
                            display: 'block', marginLeft: 'auto', marginRight: 'auto'
                        }}
                    />
                    }
                    </div>
                    <div className="col-md-6">
                    {
                    this.state.sending ?
                        <div className="spinner-border">.</div>
                        :
                    this.state.ImageUploadVisible ?
                        <div className="form-group">
                        <input type="file" onChange={this.onFileChange} />
                    </div>
                    :
                    <button type="submit" className="btn btn-primary"
                    onClick={()=>{this.setState({ImageUploadVisible:!this.state.ImageUploadVisible})}}
                    >Change Photo</button>
                    }
                    </div>
                 </div>
                   
                    
                    <div className="form-group">
                        <label for="uname">Name:</label>
                        <input type="text" className="form-control" placeholder="Enter name" name="name" 
                         value={this.state.Name}
                         onChange={(event)=>this.handleChange(event, "Name")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">PhoneNumber:</label>
                        <input type="text" className="form-control" placeholder="Enter phone number" name="phone" 
                         value={this.state.PhoneNumber}
                         onChange={(event)=>this.handleChange(event, "PhoneNumber")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">Email:</label>
                        <input type="text" className="form-control" placeholder="Enter email" name="email" 
                         value={this.state.Email}
                         onChange={(event)=>this.handleChange(event, "Email")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">About:</label>
                        <textarea  className="form-control" placeholder="Enter about you" name="about" 
                         value={this.state.About}
                         onChange={(event)=>this.handleChange(event, "About")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">City:</label>
                        <input  className="form-control" placeholder="Enter City" name="City" 
                         value={this.state.City}
                         onChange={(event)=>this.handleChange(event, "City")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">Country:</label>
                        <input  className="form-control" placeholder="Enter Country" name="Country" 
                         value={this.state.Country}
                         onChange={(event)=>this.handleChange(event, "Country")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">Company:</label>
                        <input  className="form-control" placeholder="Enter Company" name="Company" 
                         value={this.state.Company}
                         onChange={(event)=>this.handleChange(event, "Company")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">School:</label>
                        <input  className="form-control" placeholder="Enter School" name="School" 
                         value={this.state.School}
                         onChange={(event)=>this.handleChange(event, "School")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">HomeTown:</label>
                        <input  className="form-control" placeholder="Enter HomeTown" name="HomeTown" 
                         value={this.state.HomeTown}
                         onChange={(event)=>this.handleChange(event, "HomeTown")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">Languages:</label>
                        <input className="form-control" placeholder="Enter Languages" name="Languages" 
                         value={this.state.Languages}
                         onChange={(event)=>this.handleChange(event, "Languages")}
                        />
                    </div>
                    <div className="form-group">
                        <label for="uname">Gender:</label>
                        <div className="container-fluid">
                        <div className="radio">
                            <label>
                            <input type="radio" name="optradio"  checked={this.state.Gender === 'Male' ? true : false}
                            onClick={()=>{
                                this.setState({
                                    Gender:"Male"
                                })
                            }}
                            />
                            &ensp;Male</label>
                        </div>
                        <div className="radio">
                            <label><input type="radio" name="optradio" checked={this.state.Gender === 'Female' ? true : false}
                             onClick={()=>{
                                this.setState({
                                    Gender:"Female"
                                })
                            }}
                            />&ensp;Female</label>
                        </div>
                        </div>
                    </div>
                    {
                        this.state.sending ?
                        <button type="submit" className="btn btn-primary">
                           <div className="spinner-border"></div> Submitting...
                        </button>
                        :
                        <div className="form-group">
                        <button type="submit" className="btn btn-primary"
                         onClick={(e)=>{this.profileUpdate();}}
                        >
                            Submit</button>
                        </div>
                    }
                    <br></br>
            </div>
         );
    }
}
 
export default ProfileUpdate;