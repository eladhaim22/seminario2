import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../shared/components/shared/table';
import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

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
      <div className="col-md-12" >
        <Table title="Cursos" rows={this.props.courses} config={this.tableconfig()} 
          handleClose={this.handleClose.bind(this)} modifyLink='/admin/course/' deleteTitle="Borrar curso"
          deleteText="Estas seguro que queres borrar el curso?" deleteField="id">
        </Table>
      </div> 
    );
  }
}

export default connect(
  (state => ({ courses: state.course.courses ,isFetching: state.course.loading})),
  { getCourses }
)(AdminCourses);
