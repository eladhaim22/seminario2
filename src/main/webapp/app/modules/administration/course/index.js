import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export class AdminCourses extends Component {

  constructor(props) {
    super(props);
    this.state = {open: false,id:undefined};
  }

  componentDidMount() {
    this.props.getCourses();
  }

  handleOpen = (id) => {
    this.setState({open: true,id:id});
  };

  handleClose = (answer) => {
    if(answer){
      axios.delete('api/course/' + this.state.id).then(response => {
        this.props.getCourses();
      }).catch();     

    }
    this.setState({open: false,id:undefined});
  };

  render() {
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
              <h4 className="widget-title">Cursos</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <table className="table table-striped">
                <tbody>
                  <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th></th>
                  </tr>
                  {this.props.courses.map((course,i) => 
                    <tr key={i}>
                      <td>{course.id}</td>
                      <td>{course.name}</td>
                      <td>
                        <div className="btn-group flex-btn-group-container">
                          <Link to={'admin/course/' + course.id}><FlatButton label="Modificar"/></Link>
                          <FlatButton label="Borrar" onClick={this.handleOpen.bind(this,course.id)} />     
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
                Estas seguro que queres borrar este ?
              </Dialog>
          </div>
            <div style={{width:'100%'}}>
              <Link to={'admin/course/'}>
                <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
              </Link>
            </div>
        </div>  
    );
  }
}

export default connect(
  (state => ({ courses: state.course.courses ,isFetching: state.course.loading})),
  { getCourses }
)(AdminCourses);
