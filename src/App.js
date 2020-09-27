import React, { Component } from 'react';
import { HashRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import RegisterPage from './components/registerPage';
import LoginPage from './components/loginPage';
import FacultyNav from './components/faculty/faculty_nav';
import StudentNav from './components/student/student_nav';
import Profile from './components/profile';

export const FacultyRoute = ({ component: Component, ...rest }) => (

  <Route {...rest}
    render={props =>
      sessionStorage.getItem("userType") === 'Faculty' ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export const StudentRoute = ({ component: Component, ...rest }) => (

  <Route {...rest}
    render={props =>
      sessionStorage.getItem("userType") === 'Student' ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

export const CommonRoute = ({ component: Component, ...rest }) => (

  <Route {...rest}
    render={props =>
      sessionStorage.getItem("userType") ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Switch>   

              <Route exact path='/' component={LoginPage} />
              <Route exact path='/register' component={RegisterPage} />

              <FacultyRoute exact path='/home/faculty' component={FacultyNav} />
              <StudentRoute exact path='/home/student' component={StudentNav} /> 

              <CommonRoute exact path='/profile' component={Profile} /> 


            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
