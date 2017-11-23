import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../shared/components/shared/table';
import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { Link } from 'react-router';

export class AdminCourses extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCourses();
  }

  handleClose = (id) => {
      axios.delete('api/course/' + id).then(response => {
        this.props.getCourses();
      }).catch();  
  };

  tableconfig = () => {
    return [
      {
        header:'Id',
        accessor:'id'
      },
      {
        header:'Nombre',
        accessor:'name'
      }];
  }

  render() {
    return (
      <div className="col-md-10 col-md-offset-1" >
        <Table title="Cursos" rows={this.props.courses} config={this.tableconfig()} 
          handleClose={this.handleClose.bind(this)} modifyLink='/admin/course/' deleteTitle="Borrar materia"
          deleteText="Estas seguro que queres borrar la materia?" deleteField="id">
        </Table>
         <div style={{width:'100%'}}>
          <Link to="/admin/course">
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
