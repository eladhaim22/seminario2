import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../shared/components/shared/table';
import Translate from 'react-translate-component';
import { getGrades } from '../../../reducers/grade';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';
import { Link } from 'react-router';


export class AdminGrades extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getGrades();
  }

  handleClose = (id) => {
      axios.delete('api/grade/' + id).then(response => {
        this.props.getGrades();
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
        <Table title="Cursos" rows={this.props.grades} config={this.tableconfig()} 
          handleClose={this.handleClose.bind(this)} modifyLink='/admin/grade/' deleteTitle="Borrar grado"
          deleteText="Estas seguro que queres borrar el grado?" deleteField="id">
        </Table>
        <Link to="/admin/grade/new">
          <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
        </Link>
      </div>
    );
  }
}

export default connect(
  (state => ({ grades: state.grade.grades ,isFetching: state.grade.loading})),
  { getGrades }
)(AdminGrades);
