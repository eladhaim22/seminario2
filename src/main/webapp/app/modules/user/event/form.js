import React, { Component } from 'react';
import Translate from 'react-translate-component';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import moment from 'moment';
import {history} from 'react-router';
export default class UserEventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event:{},
      radioValue:''
    }
  }

  componentWillReceiveProps() {
    axios.get('/api/event/eventUser/' + this.props.params.id).then(response => {
      response.data.event.start = moment(response.data.event.start);
      response.data.event.end = moment(response.data.event.end);
      this.setState({event:response.data})
    }
    ).catch();  
  }

  getState = () => {
    switch(this.state.event.state){
      case 'pending': 
        return 'pendiente';
      case 'rejected':
        return 'rechazado';
      case 'accepted':
        return 'aprobado'; 
      default:
        return '';
    }
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({radioValue:value});
  }

  saveEvent = () => {
    if(this.state.radioValue){
      this.state.event.state = this.state.radioValue;
      axios.post('/api/event/authorize/',this.state.event).then(response =>
        history.push('/user/dashboard/')
      ).catch();
    }
  }

  render() {
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Evento</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="form-group">
                  <label>Titulo</label>
                  <input type="text" name="title" disabled className="form-control" value={this.state.event.event.title}/>
                </div>
                <div className="form-group">
                  <label>Descripcion</label>
                  <textarea name="description" disabled className="form-control" style={{resize:'none'}} value={this.state.event.event.description}/>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Fecha de inicio</label>
                      <input type="text" name="start" disabled className="form-control" value={this.state.event.event.start.format("DD-MM-YYYY")}/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Fecha de fin</label>
                      <input type="text" name="end" disabled className="form-control" value={this.state.event.event.end.format("DD-MM-YYYY")}/>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="form-group">
                      <label>Estado</label>
                      <input type="text" name="state" disabled className="form-control" value={this.getState()}/>
                    </div>
                  </div>
                </div>
                {this.state.event.event.needsAuthorization && this.state.event.state == 'pending'?  
                <div className="form-group">
                  <div className="theme-choice radio radio-primary m-b-md">
                    <input type="radio" name="navbar-theme" value="accepted"
                     checked={this.state.radioValue == "accepted" ? true : false } onChange={this.handleChange}/>
                    <label className="text-primary">Autorizo</label>
                  </div>
                  <div className="theme-choice radio radio-danger m-b-md">
                    <input type="radio" name="navbar-theme" value="rejected" 
                    checked={this.state.radioValue == "rejected" ? true : false } onChange={this.handleChange}/>
                    <label className="text-danger">No Autorizo</label>
                  </div>
                </div>
                :null}
              </form>
             </div> 
          </div>
          <div style={{width:'100%'}}>
            <FlatButton label="Volver" style={{float:'left'}} onClick={() => this.props.router.push('/user/dashboard')} primary={true}/>
            {this.state.event.state == 'pending' ? <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveEvent} primary={true}/> : null}
          </div>
        </div>  
    );
  }
}