import React, { Component } from 'react';
import Api from '../api';

class StudentCourseList extends Component {
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
        this.webCall1();
    }

    webCall = async () => {
        fetch(Api + '/student/get/all/courses', {
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

    webCall1 = async () => {
        fetch(Api + '/get/all/course', {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    datas1: responseJson,
                    sending: false
                })
                console.log(responseJson)
            })
            .catch((error) => {
                console.error(error);
                this.setState({
                    sending: false
                })
            });
    }


    registerCourse = async (item) => {
        this.setState({
            sending: true,
        })
        fetch(Api + '/stuent/add/new/course', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                courseId: item.courseId,
                courseName: item.courseName,
                courseDept: item.courseDept,
                description: item.description,
                courseRoom: item.courseRoom,
                waitlistCapacity: item.waitlistCapacity,
                courseTeam: item.courseTeam,
                createdBy: item.createdBy,
                studentName: await sessionStorage.getItem("userName"),
                studentId: await sessionStorage.getItem("userId"),
                studentCourseId: item.courseId + "-" + await sessionStorage.getItem("userId")
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData.message === "Course Registered") {
                    this.webCall();
                    alert(responseData.message)
                    this.setState({
                        sending: false,
                    })
                    this.webCall();
                }
                else {
                    this.webCall();
                    alert(JSON.stringify(item.courseName + " is already registered..!"))
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
                                    <h4 className="modal-title">Register Course</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                </div>

                                <div className="modal-body">
                                    {
                                        this.state.datas1 ?
                                            this.state.datas1.map((item, i) =>
                                                <div className="card" style={{ padding: "5px", marginTop: "20px" }}>
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h6>{item.courseName}</h6>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h6 style={{ color: 'grey', }}>{item.courseDept}</h6>
                                                        </div>
                                                    </div>
                                                    <hr></hr>
                                                    <p>Team:{item.courseTeam}</p>
                                                    <button type="button" className="btn btn-primary" data-dismiss="modal"
                                                    onClick={()=>{
                                                        window.confirm("Are you sure you wish to add this course.?") &&
                                                        this.registerCourse(item);
                                                    }}
                                                    >Click here to register for this course</button>
                                                </div>

                                            )
                                            :
                                            <div>
                                                <p style={{ textAlign: 'center', marginTop: "45vh" }}>
                                                    No course to show
                                                 </p>
                                            </div>
                                    }
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal" >Discard</button>
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
                            <div className="card" style={{ padding: "5px", marginTop: "20px" }}>
                                <div className="row">
                                    <div className="col-md-4">
                                        <h6>{item.courseName}</h6>
                                    </div>
                                    <div className="col-md-4">
                                        <h6 style={{ color: 'grey', }}>{item.courseDept}</h6>
                                    </div>
                                    <div className="col-md-4">
                                    <span className="fas fa-home" style={{color:'grey'}}>&ensp; {item.courseRoom}</span>
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
                            <p style={{ textAlign: 'center', marginTop: "45vh" }}>
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

export default StudentCourseList;
