import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../shared/components/shared/table';
import Translate from 'react-translate-component';
import { getUsers } from '../../../reducers/administration';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export class UserManagement extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getUsers();
  }

  handleClose = (id) => {
    axios.delete('api/users/' + this.state.login).then(response => {
      this.props.getUsers();
    });     
  };
  
  tableconfig = () => {
    return [
      {
        header:'Login',
        accessor:'login'
      },
      {
        header:'Email',
        accessor:'email'
      },
      {
        header:'Estado',
        accessor:'activated'
      },
      {
        header:'Roles',
        accessor:'authorities',
        Cell:(props)=> <div>
                        {props.value.authorities.map(authority =>
                          <div>
                              <span className="label label-info">{authority}</span>
                          </div>
                          )}
                      </div>
      }];
  }

  handleClose = (id) => {
    axios.delete('api/users/' + id).then(response => {
      this.props.getUsers();
    });     
  };

  render() {
    return (
        <div className="col-md-12" >
        <Table title="Usuarios" rows={this.props.userManagement} config={this.tableconfig()} 
          handleClose={this.handleClose.bind(this)} modifyLink='/admin/user/' deleteTitle="Borrar usuario"
          deleteText="Estas seguro que queres borrar el usuario?" deleteField="login">
          </Table>
           <Link to="/admin/user/new">
            <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
          </Link>
        </div>
      );
  }
}

export default connect(
  (state => ({ userManagement: state.administration.userManagement.users, isFetching: state.administration.isFetching, account: state.authentication.account })),
  { getUsers }
)(UserManagement);
