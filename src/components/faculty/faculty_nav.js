import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FacultyMain from './faculty_main';

class FacultyNav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>

                <nav className="navbar navbar-inverse navbar-expand-md bg-dark navbar-dark fixed-top">
                    <a className="navbar-brand" href="/">NYXWolves - faculty</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                             &ensp; <Link to="/" style={{color:'blue'}}>Home</Link>
                            </li>
                            <li className="nav-item">
                               &ensp; <Link to="/" style={{color:'white'}}>About</Link>
                            </li>
                            <li className="nav-item">
                            &ensp; <Link to="/" style={{color:'white'}}>Contact</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav" style={{marginLeft:'auto'}}>
                            <li className="nav-item">
                             &ensp; <Link to="/profile" style={{color:'white'}}>
                             <i className="fas fa-user"></i>&ensp;
                             </Link>
                            </li>
                            <li className="nav-item">
                               &ensp;<Link to="/" style={{color:'white'}}
                               onClick={()=>{
                                window.confirm("Are you sure you wish to logout.?") &&
                                   sessionStorage.clear();}}
                               >Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br></br>

                <div className="container">
                    <FacultyMain/>
                </div>
            </div>
        );
    }
}

export default FacultyNav;