import React, { Component } from 'react';
import Translate from 'react-translate-component';
import FlatButton from 'material-ui/FlatButton';
import {connect} from 'react-redux';
import { getGrades } from '../../../reducers/grade';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import Select from 'react-select';
import moment from 'moment';
import DatePicker from 'react-bootstrap-date-picker';

export class AdminEventForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event:{},
      selectGrade:undefined,
      select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      }
    }
  }

  componentWillMount(){
    this.props.getGrades();
  }

  componentWillReceiveProps() {
    if(this.props.params.id){
      axios.get('/api/event/' + this.props.params.id).then(response => {
        let selectGrade = {};
        selectGrade.label = response.data.grade.name;
        selectGrade.value = response.data.grade.id;
        response.data.startIso = new Date(response.data.start);
        response.data.endIso = new Date(response.data.end);
        this.setState({event:response.data,selectGrade:selectGrade})
      }
      ).catch();  
    }
  }

  handleChangeStart(date) {
    let event = Object.assign({},this.state.event);
    event.start = date;
    this.setState({event: event});
  }

  handleChangeFin(date) {
    let event = Object.assign({},this.state.event);
    event.end = date;
    this.setState({event: event});
  }

  getGrades = () => {
    return this.props.grades.map(grade => {return {'label':grade.name,'value':grade.id}});  
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let newEvent = Object.assign({},this.state.event);
    newEvent[name] = value;
    this.setState({event:newEvent});
  }

  handleChangeGrade = (val) => {
    this.setState({selectGrade:val});
  }
  

  saveEvent = () => {
    this.state.event.grade = this.props.grades.find(grade => grade.id == this.state.selectGrade.value);
    axios.post('/api/event/saveWithUsers/',this.state.event).then(response =>
      console.log('guardo')
    ).catch();    
    this.props.router.push('/admin/events/');
  }

  render() {
    const { crazy, disabled, stayOpen} = this.state.select;
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Evento</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="row">
                  <div className="col-md-7"> 
                    <div className="form-group">
                      <label>Titulo</label>
                      <input type="text" name="title" className="form-control" value={this.state.event.title}
                      onChange={this.handleChange}/>
                    </div>
                  </div>
                  <div className="col-md-5"> 
                    <div className="form-group">
                      <label>Grado</label>
                      <Select
                            closeOnSelect={!stayOpen}
                            disabled={disabled}
                            multi={false}
                            onChange={this.handleChangeGrade}
                            options={this.getGrades()}
                            removeSelected={this.state.select.removeSelected}
                            rtl={this.state.select.rtl}
                            value={this.state.selectGrade}
                          /> 
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Descripcion</label>
                  <textarea name="description" className="form-control" style={{resize:'none'}}
                  onChange={this.handleChange} value={this.state.event.description}/>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha de inicio</label>
                      <DatePicker dateFormat="DD-MM-YYYY" value={this.state.event.start} onChange={this.handleChangeStart.bind(this)}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fecha de fin</label>
                      <DatePicker dateFormat="DD-MM-YYYY" value={this.state.event.end} onChange={this.handleChangeFin.bind(this)}/>  
                    </div>
                  </div>
                </div>  
                <div className="form-group">
                  <div className="checkbox checkbox-primary" style={{marginTop:'30px'}}>
                    <input type="checkbox" name="needsAuthorization" checked={this.state.event.needsAuthorization}
                    onChange={this.handleChange}/>
                    <label for="checkbox-demo-1">Requiere Authorizacion?</label>
                  </div>
                </div>
            </form>
           </div> 
          </div>
          <div style={{width:'100%'}}>
            <FlatButton label="Volver" style={{float:'left'}} onClick={() => this.props.router.push('/admin/events/')} primary={true}/>
            <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveEvent} primary={true}/>
          </div>
        </div>  
    );
  }
}

export default connect(
  (state => ({ grades: state.grade.grades ,isFetching: state.grade.loading})),
  { getGrades }
)(AdminEventForm);
