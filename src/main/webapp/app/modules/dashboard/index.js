import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';

import { getSession } from '../../reducers/authentication';
import { getCourses } from '../../reducers/dashboard';



export class Dashboard extends Component {
  static propTypes = {
    account: React.PropTypes.object.isRequired,
    getSession: React.PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.account
    };
  }

  componentWillMount() {
    this.props.getSession();
    this.props.getCourses();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            Cursos
          </div>
        </div>
        {this.props.courses.map((course) => {
          console.log(course);
          return(<div>
            {course.name}
          </div>)
        })}
      </div>
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
    isAuthenticated: store.authentication.isAuthenticated,
    courses: store.dashboard.courses
  }),
  { getSession, getCourses }
)(Dashboard);
