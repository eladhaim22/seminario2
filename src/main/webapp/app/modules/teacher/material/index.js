import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../shared/components/shared/table';
import Translate from 'react-translate-component';
import { getCourses } from '../../../reducers/course';
import FlatButton from 'material-ui/FlatButton';
import { getMaterial } from '../../../reducers/material';
import { getCourseById } from '../../../reducers/course';
import axios from 'axios';
import { Link } from 'react-router';

export class TeacherMaterial extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getMaterial();
    this.props.getCourseById(this.props.params.courseId);
  }

  tableconfig = () => {
    return [
      {
        header:'Titulo',
        accessor:'title'
      },
      {
        header:'Video Id',
        accessor:'videoId'
      }];
  }

  handleClose = (id) => {
    axios.delete('api/material/' + id).then(response => {
      this.props.getMaterial();
    }).catch();  
  };

  render() {
    return (
      <div className="col-md-8 col-md-offset-2" >
        <Table title="Material de estudio" rows={this.props.material.filter(m => m.course == this.props.course.id)} config={this.tableconfig()} 
          handleClose={this.handleClose.bind(this)} modifyLink={'/teacher/course/' + this.props.params.courseId + '/material/'}
          deleteTitle="Borrar video" deleteText="Estas seguro que queres borrar el video?" deleteField="id">
        </Table>
        <Link to={'/teacher/course/' + this.props.params.courseId + '/material'}>
          <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
        </Link>
      </div> 
    );
  }
}

export default connect(
  store => ({
    material: store.material.materials,
    course: store.course.course
  }),
  {getMaterial,getCourseById}
)(TeacherMaterial);