import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';

import { log } from '../../shared/util/log-util';
import { getSession } from '../../reducers/authentication';

import './home.scss';

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
          coursos.map(course => {
           <Link to={"/course/" + course.id}>
                {course.name}
            </Link>
          })
        <div>        
      </div>
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
    isAuthenticated: store.authentication.isAuthenticated,
    coursos: store.courses 
  }),
  { getSession }
)(Home);
