import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../../../shared/components/shared/table';
import Translate from 'react-translate-component';
import { getAllEvents } from '../../../reducers/events';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import axios from 'axios';
import moment from 'moment';

export class EventManagement extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getAllEvents();
  }

  tableconfig = () => {
    return [
      {
        header:'Titulo',
        accessor:'title'
      },
      {
        header:'Fecha de inicio',
        accessor:'start',
        Cell:(props) => moment(props.value.start).format('DD-MM-YYYY')
      },
      {
        header:'Fecha de finalizacion',
        accessor:'end',
        Cell:(props) => moment(props.value.end).format('DD-MM-YYYY')
      },
      {
        header:'Requiere autorizacion',
        accessor:'needsAuthorization',
        Cell:(props) => props.value.needsAuthorization ? 'SI' : 'NO'
      }];
  }

  handleClose = (id) => {
    axios.delete('api/event/' + id).then(response => {
      this.props.getAllEvents();
    });     
  };

  render() {
    return (
        <div className="col-md-12" >
          <Table title="Actividades" rows={this.props.events} config={this.tableconfig()} 
          handleClose={this.handleClose.bind(this)} modifyLink='/admin/event/' deleteTitle="Borrar evento"
          deleteText="Estas seguro que queres borrar la actividad?" deleteField="id">
          </Table>
          <Link to="/admin/event">
            <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
          </Link>
        </div>
    );
  }
}

export default connect(
  state => ({
    events: state.events.allEvents
  }),
  { getAllEvents }
)(EventManagement);