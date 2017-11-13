import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getUsers } from '../../../reducers/administration';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export class UserManagement extends Component {

  constructor(props) {
    super(props);
    this.getUserList = this.getUserList.bind(this);
    this.state = {open: false,login:undefined};
  }

  componentDidMount() {
    this.props.getUsers();
  }

  handleOpen = (login) => {
    this.setState({open: true,login:login});
  };

  handleClose = (answer) => {
    if(answer){
      axios.delete('api/users/' + this.state.login).then(response => {
        this.props.getUsers();
      });     
    }
    this.setState({open: false,login:undefined});
  };

  getUserList() {
    if (!this.props.isFetching) {
      this.props.getUsers();
    }
  }

  render() {
    const { userManagement, isFetching } = this.props;
    const users = (userManagement && userManagement.users) ? userManagement.users : [];
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onClick={this.handleClose.bind(this,false)}
      />,
      <FlatButton
        label="Si"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose.bind(this,true)}
      />,
    ];
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Usuarios</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Login</th>
                    <th>Email</th>
                    <th>Estado</th>
                    <th>Roles</th>
                    <th></th>
                  </tr>
                  {users.map((user,i) => 
                    <tr key={i}>
                      <td>{user.id}</td>
                      <td>{user.login}</td>
                      <td>{user.email}</td>
                      <td>
                        {
                          user.activated ? (
                            <span
                              className="label label-success" ng-click="vm.setActive(user, false)" ng-show="user.activated"
                              translate="userManagement.activated" style={{ cursor: 'pointer' }}
                            >Activated</span>
                          ) : (
                            <span
                              className="label label-danger" ng-click="vm.setActive(user, true)" ng-show="!user.activated"
                              translate="userManagement.deactivated" style={{ cursor: 'pointer' }}
                            >Deactivated</span>
                          )
                        }
                      </td>
                      <td>
                        {
                          user.authorities ? (
                          user.authorities.map((authority, i) => (
                            <div>
                              <span className="label label-info">{authority}</span>
                            </div>
                          ))) : null
                        }
                      </td>
                      <td>
                        <div className="btn-group flex-btn-group-container">
                          <Link to={'admin/user/' + user.id}><FlatButton label="Modificar"/></Link>
                          <FlatButton label="Borrar" onClick={this.handleOpen.bind(this,user.login)} />     
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Dialog
                title="Dialog With Actions"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
              >
                Estas seguro que queres borrar este usuario?
              </Dialog>
          </div>
           <div style={{width:'100%'}}>
              <Link to={'admin/user/'}>
                <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
              </Link>
            </div>
        </div>  
    );
  }
}

export default connect(
  (state => ({ userManagement: state.administration.userManagement, isFetching: state.administration.isFetching, account: state.authentication.account })),
  { getUsers }
)(UserManagement);
