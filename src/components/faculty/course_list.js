import React, { Component } from 'react';
import Api from '../api';

class CourseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sending: true,
            courseId: "",
            courseName: "",
            courseDept: "",
            Description: "",
            courseRoom: "",
            waitlistCapacity: "",
            courseTeam: ""
        }
    }
    componentDidMount = () => {
        this.webCall();
    }

    webCall = async () => {
        fetch(Api + '/faculty/get/all/course', {
            method: 'GET',
            headers: {
                'id': await sessionStorage.getItem('userId'),
            },
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datas: responseJson,
                    sending: false
                })
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    sending: false
                })
            });
    }

    handleChange(event) {
        this.setState({
            courseId: event.target.value,
        })
    }
    handleChange1(event) {
        this.setState({
            courseName: event.target.value,
        })
    }
    handleChange2(event) {
        this.setState({
            courseDept: event.target.value,
        })
    }
    handleChange3(event) {
        this.setState({
            Description: event.target.value,
        })
    }
    handleChange4(event) {
        this.setState({
            courseRoom: event.target.value,
        })
    }
    handleChange5(event) {
        this.setState({
            waitlistCapacity: event.target.value,
        })
    }
    handleChange6(event) {
        this.setState({
            courseTeam: event.target.value,
        })
    }

    addCourse = async () => {
        this.setState({
            sending: true,
        })
        fetch(Api + '/faculty/add/new/course', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: await this.state.courseId,
                courseName: await this.state.courseName,
                courseDept: await this.state.courseDept,
                description: await this.state.Description,
                courseRoom: await this.state.courseRoom,
                waitlistCapacity: await this.state.waitlistCapacity,
                courseTeam: await this.state.courseTeam,
                createdBy: await sessionStorage.getItem("userId")
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.message === "Course Added") {
                    this.webCall();
                    alert(responseData.message)
                    this.setState({
                        sending: false,
                    })
                    this.webCall();
                    this.clearInput();
                }
                else {
                    this.webCall();
                    alert(JSON.stringify(responseData.message+" is already taken"))
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

    clearInput = () => {
        this.setState({
            courseId: "",
            courseName: "",
            courseDept: "",
            Description: "",
            courseRoom: "",
            waitlistCapacity: "",
            courseTeam: ""
        })
    }

    render() {
        if (this.state.sending) {
            return (
                <div className="spinner-border" style={{ marginLeft: '48%', marginTop: "45vh" }}></div>
            )
        }
        return (
            <div>
                {/* modal start */}
                <br></br>
                <div className="row" style={{ marginTop: "10px" }}>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal"
                        data-backdrop="static" data-keyboard="false"
                        style={{ marginLeft: "auto" }}>
                        <i className="fas fa-plus"></i>&ensp; New course
                    </button>
                    <div className="modal" id="myModal">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">Add Course</h4>
                                    <button type="button" className="close" data-dismiss="modal"
                                        onClick={() => { this.clearInput(); }}
                                    >&times;</button>
                                </div>

                                <div className="modal-body">
                                    <div className="form-group">
                                        <label for="uname">CourseId</label>
                                        <input type="text" className="form-control" placeholder="Enter courseId" name="courseId"
                                            value={this.state.courseId}
                                            onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">CourseName</label>
                                        <input type="text" className="form-control" placeholder="Enter courseName" name="courseName"
                                            value={this.state.courseName}
                                            onChange={this.handleChange1.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">CourseDept</label>
                                        <input type="text" className="form-control" placeholder="Enter courseDept" name="courseDept"
                                            value={this.state.courseDept}
                                            onChange={this.handleChange2.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">Description</label>
                                        <textarea className="form-control" placeholder="Enter description" name="description"
                                            value={this.state.Description}
                                            onChange={this.handleChange3.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">CourseRoom</label>
                                        <input type="text" className="form-control" placeholder="Enter courseRoom" name="courseRoom"
                                            value={this.state.courseRoom}
                                            onChange={this.handleChange4.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">Waitlist Capacity</label>
                                        <input type="number" className="form-control" placeholder="Enter waitlist capacity" name="capacity"
                                            value={this.state.waitlistCapacity}
                                            onChange={this.handleChange5.bind(this)}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="uname">CourseTeam</label>
                                        <input type="text" className="form-control" placeholder="Enter courseTeam" name="courseTeam"
                                            value={this.state.courseTeam}
                                            onChange={this.handleChange6.bind(this)}
                                        />
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    {
                                        this.state.sending ?
                                            <button type="button" className="btn btn-primary" data-dismiss="modal">
                                                <div className="spinner-border"></div> Adding..</button>
                                            :
                                            <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                onClick={() => { this.addCourse(); }}
                                            >Add</button>
                                    }
                                    <button type="button" className="btn btn-danger" data-dismiss="modal"
                                        onClick={() => { this.clearInput(); }}
                                    >Discard</button>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
                {/* modal end */}
                <br></br>
                
                {/* list starts */}
                {
                    this.state.datas ?
                        this.state.datas.map((item, i) =>
                            <div className="card" style={{ padding: "5px",marginTop:"20px" }}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>{item.courseName}</h6>
                                    </div>
                                    <div className="col-md-6">
                                        <h6 style={{ color: 'grey', }}>{item.courseDept}</h6>
                                     </div>
                                </div>
                                <hr></hr>
                                <p>{item.description}</p>
                                <hr></hr>
                                <p>Team:{item.courseTeam}</p>
                            </div>

                        )
                        :
                        <div>
                            <p  style={{ textAlign:'center',marginTop: "45vh" }}>
                             No course to show
                            </p>
                        </div>
                }
                {/* list ends */}
                <div style={{height:"5vh"}}></div>
            </div>
        );
    }
}

export default CourseList;
